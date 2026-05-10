import type { OgLayout } from '~/og/types'

export const useOgLayout = (layout?: OgLayout) => {
  return layout ?? 'center'
}
