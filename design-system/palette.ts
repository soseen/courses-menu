/**
 * The canonical color palette for the public menu and the Sanity Studio.
 *
 * Keep raw color values here. The apps map these colors to their own semantic
 * systems (Bootstrap variables in the web app and Sanity theme values in Studio).
 */
export const palette = {
  background: '#f4f2e7',
  primary: '#ebeade',
  secondary: '#98a491',
  dark: '#777f72',

  // Supporting colors derived from the supplied palette for accessible text
  // and interactive controls on the light background.
  ink: '#2f352e',
  action: '#596451',
  white: '#ffffff',
} as const

export type PaletteColor = keyof typeof palette
