import {buildLegacyTheme} from 'sanity'
import {palette} from '../design-system/palette'

/**
 * Sanity owns Studio's component styles, so we map the shared palette to its
 * native theme roles instead of introducing Bootstrap into the authoring UI.
 */
export const menuStudioTheme = buildLegacyTheme({
  '--black': palette.ink,
  '--white': palette.white,
  '--brand-primary': palette.action,
  '--component-bg': palette.background,
  '--component-text-color': palette.ink,
  '--default-button-color': palette.primary,
  '--default-button-primary-color': palette.action,
  '--focus-color': palette.action,
  '--gray-base': palette.secondary,
  '--gray': palette.dark,
  '--main-navigation-color': palette.action,
  '--main-navigation-color--inverted': palette.white,
})
