import {mkdir} from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import {fileURLToPath, URL} from 'node:url'
import QRCode from 'qrcode'

const DEFAULT_PUBLIC_MENU_URL = 'https://courses-menu.pages.dev/'
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.resolve(scriptDirectory, '../../assets/courses-menu-qr-code.png')

function normalizePublicUrl(value) {
  const url = new URL(value.trim())
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('The QR destination must begin with http:// or https://.')
  }
  return url.href
}

const publicMenuUrl = normalizePublicUrl(
  process.argv[2] || process.env.SANITY_STUDIO_MENU_URL || DEFAULT_PUBLIC_MENU_URL,
)

await mkdir(path.dirname(outputPath), {recursive: true})
await QRCode.toFile(outputPath, publicMenuUrl, {
  color: {dark: '#000000', light: '#ffffff'},
  errorCorrectionLevel: 'H',
  margin: 4,
  type: 'png',
  width: 1024,
})

process.stdout.write(`Created ${outputPath}\n`)
process.stdout.write(`Destination: ${publicMenuUrl}\n`)
