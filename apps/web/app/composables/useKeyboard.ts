import { onMounted, onBeforeUnmount } from 'vue'

type KeyDescriptor = string
type KeyHandler = (e: KeyboardEvent) => void
type Callback = (e: KeyboardEvent) => void

function normalizeDescriptor(descriptor: string) {
  return descriptor.toLowerCase()
}

function matchesDescriptor(e: KeyboardEvent, descriptor: string) {
  const parts = descriptor
    .toLowerCase()
    .split('+')
    .map(p => p.trim())
  const keyPart = parts[parts.length - 1]
  const requireShift = parts.includes('shift')
  const requireCtrl = parts.includes('ctrl') || parts.includes('control')
  const requireAlt = parts.includes('alt')
  const requireMeta
    = parts.includes('meta')
      || parts.includes('cmd')
      || parts.includes('command')

  const key = e.key.toLowerCase() === ' ' ? 'space' : e.key.toLowerCase()
  const targetKey = keyPart === ' ' ? 'space' : keyPart

  if (requireShift !== e.shiftKey) return false
  if (requireCtrl !== e.ctrlKey) return false
  if (requireAlt !== e.altKey) return false
  if (requireMeta !== e.metaKey) return false
  return key === targetKey
}

export function useKeyboard() {
  const handlers: Array<{ descriptor: KeyDescriptor, handler: KeyHandler }>
    = []

  const keydownListener = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName

    if (['INPUT', 'TEXTAREA'].includes(tag)) return

    for (const { descriptor, handler } of handlers) {
      if (matchesDescriptor(e, descriptor)) {
        handler(e)
      }
    }
  }

  onMounted(() => window.addEventListener('keydown', keydownListener))
  onBeforeUnmount(() => window.removeEventListener('keydown', keydownListener))

  function addGlobalShortcut(
    descriptor: KeyDescriptor | KeyDescriptor[],
    handler: KeyHandler
  ) {
    const list = Array.isArray(descriptor) ? descriptor : [descriptor]
    for (const d of list)
      handlers.push({ descriptor: normalizeDescriptor(d), handler })
  }

  function createElementKeyHandler(
    callback: Callback,
    keys: KeyDescriptor[] = ['enter', 'space', 't']
  ): (e: KeyboardEvent) => void {
    return (e: KeyboardEvent) => {
      for (const k of keys) {
        if (matchesDescriptor(e, k)) {
          e.preventDefault()
          callback(e)
          break
        }
      }
    }
  }

  return { addGlobalShortcut, createElementKeyHandler, matchesDescriptor }
}
