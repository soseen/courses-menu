import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { palette } from '../design-system/palette.ts'

const paletteSassVariables = Object.entries(palette)
  .map(([name, value]) => `$menu-${name}: ${value};`)
  .join('\n')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `${paletteSassVariables}\n`,
        quietDeps: true,
        silenceDeprecations: ['color-functions', 'global-builtin', 'import'],
      },
    },
  },
})
