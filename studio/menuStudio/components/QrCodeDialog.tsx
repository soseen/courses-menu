import {useCallback, useEffect, useMemo, useState} from 'react'
import type {FormEvent} from 'react'
import QRCode from 'qrcode'
import {useMenuStudio} from '../context/useMenuStudio'
import {DEFAULT_PUBLIC_MENU_URL, MENU_SETTINGS_ID} from '../constants'
import {DownloadIcon, ExternalLinkIcon} from '../icons'
import {
  ErrorBanner,
  Field,
  ModalActions,
  OutlineButton,
  Overlay,
  PrimaryButton,
  QrCodeDetails,
  QrCodeModalCard,
  QrCodePreview,
  QrCodeWorkspace,
} from '../styles'

type MenuSettingsDocument = {
  _id: string
  _type: 'menuSettings'
  publicUrl?: string
}

function normalizePublicUrl(value: string) {
  const url = new URL(value.trim())
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Enter a complete URL beginning with http:// or https://.')
  }
  return url.href
}

export function QrCodeDialog() {
  const {client, closeQrCodeDialog, isQrCodeDialogOpen} = useMenuStudio()
  const [publicUrl, setPublicUrl] = useState(DEFAULT_PUBLIC_MENU_URL)
  const [savedUrl, setSavedUrl] = useState(DEFAULT_PUBLIC_MENU_URL)
  const [qrImage, setQrImage] = useState<{dataUrl: string; url: string}>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const normalizedUrl = useMemo(() => {
    try {
      return normalizePublicUrl(publicUrl)
    } catch {
      return undefined
    }
  }, [publicUrl])
  const hasChanges = normalizedUrl !== savedUrl
  const currentQrImage = qrImage?.url === normalizedUrl ? qrImage.dataUrl : undefined

  const closeDialog = useCallback(() => {
    if (saving) return
    closeQrCodeDialog()
  }, [closeQrCodeDialog, saving])

  useEffect(() => {
    if (!isQrCodeDialogOpen) return undefined

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDialog()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [closeDialog, isQrCodeDialogOpen])

  useEffect(() => {
    if (!isQrCodeDialogOpen) return undefined

    let active = true
    setLoading(true)
    setError(undefined)
    client
      .getDocument<MenuSettingsDocument>(MENU_SETTINGS_ID)
      .then((settings) => {
        if (!active) return
        const nextUrl = settings?.publicUrl || DEFAULT_PUBLIC_MENU_URL
        setPublicUrl(nextUrl)
        setSavedUrl(nextUrl)
      })
      .catch((loadError: unknown) => {
        if (!active) return
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'The saved menu address could not be loaded.',
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [client, isQrCodeDialogOpen])

  useEffect(() => {
    if (!isQrCodeDialogOpen) return undefined
    if (!normalizedUrl) {
      setQrImage(undefined)
      return undefined
    }

    let active = true
    const timer = window.setTimeout(() => {
      QRCode.toDataURL(normalizedUrl, {
        color: {dark: '#000000', light: '#ffffff'},
        errorCorrectionLevel: 'H',
        margin: 4,
        type: 'image/png',
        width: 1024,
      })
        .then((dataUrl) => {
          if (active) setQrImage({dataUrl, url: normalizedUrl})
        })
        .catch((qrError: unknown) => {
          if (!active) return
          setQrImage(undefined)
          setError(qrError instanceof Error ? qrError.message : 'The QR code could not be created.')
        })
    }, 120)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [isQrCodeDialogOpen, normalizedUrl])

  if (!isQrCodeDialogOpen) return null

  const handleSave = async (event: FormEvent) => {
    event.preventDefault()
    if (!normalizedUrl || saving) {
      setError('Enter a complete URL beginning with http:// or https://.')
      return
    }

    setSaving(true)
    setError(undefined)
    try {
      await client
        .transaction()
        .createIfNotExists({
          _id: MENU_SETTINGS_ID,
          _type: 'menuSettings',
          publicUrl: normalizedUrl,
        })
        .patch(MENU_SETTINGS_ID, (patch) => patch.set({publicUrl: normalizedUrl}))
        .commit()
      setPublicUrl(normalizedUrl)
      setSavedUrl(normalizedUrl)
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'The menu address could not be saved.',
      )
    } finally {
      setSaving(false)
    }
  }

  const downloadQrCode = () => {
    if (!currentQrImage) return
    const link = document.createElement('a')
    link.download = 'courses-menu-qr-code.png'
    link.href = currentQrImage
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <Overlay
      aria-label="Menu QR code"
      aria-modal="true"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) closeDialog()
      }}
      role="dialog"
    >
      <QrCodeModalCard
        as="form"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={handleSave}
      >
        <h2>Menu QR code</h2>
        <p>Download a print-ready PNG, or update the destination if the public domain changes.</p>

        {error && <ErrorBanner>{error}</ErrorBanner>}

        <QrCodeWorkspace>
          <QrCodePreview aria-busy={Boolean(normalizedUrl && !currentQrImage)}>
            {currentQrImage ? (
              <img alt={`QR code for ${normalizedUrl}`} src={currentQrImage} />
            ) : (
              <span>{normalizedUrl ? 'Creating QR code…' : 'Enter a valid URL'}</span>
            )}
          </QrCodePreview>

          <QrCodeDetails>
            <Field>
              Public menu URL
              <input
                autoFocus
                disabled={loading || saving}
                inputMode="url"
                onChange={(event) => {
                  setPublicUrl(event.target.value)
                  setError(undefined)
                }}
                placeholder="https://example.com/menu/"
                type="url"
                value={publicUrl}
              />
            </Field>
            <p>
              The QR preview updates as you type. Save the destination so every Studio user sees
              the same address next time.
            </p>

            <OutlineButton
              disabled={loading || !currentQrImage}
              onClick={downloadQrCode}
              type="button"
            >
              <DownloadIcon /> Download PNG
            </OutlineButton>
            {normalizedUrl && (
              <a href={normalizedUrl} rel="noreferrer" target="_blank">
                Check destination <ExternalLinkIcon />
              </a>
            )}
          </QrCodeDetails>
        </QrCodeWorkspace>

        <ModalActions>
          <OutlineButton disabled={saving} onClick={closeDialog} type="button">
            Close
          </OutlineButton>
          <PrimaryButton disabled={!normalizedUrl || !hasChanges || saving} type="submit">
            {saving ? 'Saving…' : hasChanges ? 'Save destination' : 'Destination saved'}
          </PrimaryButton>
        </ModalActions>
      </QrCodeModalCard>
    </Overlay>
  )
}
