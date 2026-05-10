export const upper = (v: string) => v?.toUpperCase()

export const safeText = (v?: string) => v?.trim() ?? ''

export const truncate = (v: string, len: number) =>
  v.length > len ? v.slice(0, len) + '…' : v
