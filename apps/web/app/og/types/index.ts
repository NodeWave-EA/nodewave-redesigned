export type OgLayout = 'center' | 'left' | 'split'
export type OgTheme = 'teal' | 'violet' | 'dark'

export type OgProps = {
  title?: string
  description?: string
  meta?: {
    theme?: OgTheme
    layout?: OgLayout
    brand?: string
  }
}
