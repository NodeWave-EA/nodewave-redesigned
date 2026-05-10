import teal from './teal'
import violet from './violet'
import dark from './dark'

export const themes = {
  teal,
  violet,
  dark
} as const

export type ThemeName = keyof typeof themes
