import { computed, nextTick, ref } from 'vue'

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => ViewTransition
  }
}

interface ViewTransition {
  ready: Promise<void>
  finished: Promise<void>
  skipTransition: () => void
}

export function useTheme() {
  const { $refreshHardAos } = useNuxtApp()
  const colorMode = useColorMode()
  const lastMousePos = ref({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  })

  type ThemeEvent = MouseEvent | TouchEvent | KeyboardEvent

  const newTheme = computed(() =>
    colorMode.value === 'dark' ? 'light' : 'dark'
  )
  const currentIcon = computed(() =>
    colorMode.value === 'dark' ? 'sun' : 'moon'
  )

  const toggleTheme = () => {
    colorMode.preference = newTheme.value
  }

  const refreshAos = () => {
    nextTick(() => {
      if (typeof $refreshHardAos === 'function') {
        $refreshHardAos()
      }
    })
  }

  // Track mouse position for keyboard shortcuts
  if (import.meta.client) {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      lastMousePos.value = { x: e.clientX, y: e.clientY }
    })
  }

  const startViewTransition = (event?: ThemeEvent) => {
    if (!document.startViewTransition) {
      toggleTheme()
      refreshAos()
      return
    }

    const x
      = event instanceof MouseEvent
        ? event.clientX
        : event instanceof TouchEvent
          ? (event.touches[0]?.clientX ?? lastMousePos.value.x)
          : lastMousePos.value.x
    const y
      = event instanceof MouseEvent
        ? event.clientY
        : event instanceof TouchEvent
          ? (event.touches[0]?.clientY ?? lastMousePos.value.y)
          : lastMousePos.value.y
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      toggleTheme()
    })

    transition.ready
      .then(() => {
        const duration = 600
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: duration,
            easing: 'cubic-bezier(.76,.32,.29,.99)',
            pseudoElement: '::view-transition-new(root)'
          }
        )
        setTimeout(() => {
          refreshAos()
        }, duration)
      })
      .catch(() => {
        // Silently handle AbortError when transition is skipped
      })
  }

  const handleToggleKeydown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    if (key === 'enter' || key === ' ' || key === 'spacebar' || key === 't') {
      event.preventDefault()
      startViewTransition(event)
    }
  }

  return {
    newTheme,
    currentIcon,
    toggleTheme,
    startViewTransition,
    handleToggleKeydown
  }
}
