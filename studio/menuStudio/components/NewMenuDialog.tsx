import {useCallback, useEffect, useState} from 'react'
import type {FormEvent} from 'react'
import {useMenuStudio} from '../context/useMenuStudio'
import {
  ErrorBanner,
  Field,
  ModalActions,
  ModalCard,
  OutlineButton,
  Overlay,
  PrimaryButton,
} from '../styles'

export function NewMenuDialog() {
  const {closeNewMenuDialog, createMenu, error, isNewMenuDialogOpen} = useMenuStudio()
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)

  const closeDialog = useCallback(() => {
    if (creating) return
    setName('')
    closeNewMenuDialog()
  }, [closeNewMenuDialog, creating])

  useEffect(() => {
    if (!isNewMenuDialogOpen) return undefined

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDialog()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [closeDialog, isNewMenuDialogOpen])

  if (!isNewMenuDialogOpen) return null

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim() || creating) return

    setCreating(true)
    const created = await createMenu(name)
    setCreating(false)
    if (created) {
      setName('')
      closeNewMenuDialog()
    }
  }

  return (
    <Overlay
      aria-label="Create a menu"
      aria-modal="true"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) closeDialog()
      }}
      role="dialog"
    >
      <ModalCard as="form" onMouseDown={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <h2>New menu</h2>
        <p>Give this menu a clear name. You can add categories and courses next.</p>
        {error && <ErrorBanner>{error}</ErrorBanner>}
        <Field>
          Menu name
          <input
            autoFocus
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Autumn dinner"
            type="text"
            value={name}
          />
        </Field>
        <ModalActions>
          <OutlineButton disabled={creating} onClick={closeDialog} type="button">
            Cancel
          </OutlineButton>
          <PrimaryButton disabled={!name.trim() || creating} type="submit">
            {creating ? 'Saving…' : 'Save menu'}
          </PrimaryButton>
        </ModalActions>
      </ModalCard>
    </Overlay>
  )
}
