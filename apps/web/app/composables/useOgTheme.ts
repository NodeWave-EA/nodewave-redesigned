import { themes, type ThemeName } from '~/og/themes'

export const useOgTheme = (theme?: ThemeName) => {
  return themes[theme ?? 'teal']
}
