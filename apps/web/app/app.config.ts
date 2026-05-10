export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      secondary: 'blue',
      success: 'green',
      info: 'sky',
      warning: 'amber',
      error: 'red',
      neutral: 'zinc'
    },
    strategy: 'override',
    palette: {
      teal: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
        950: '#042f2e'
      },
      success: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        950: '#022c22'
      }
    },
    // components
    button: {
      defaultVariants: {
        size: 'md'
      },
      compoundVariants: []
    },
    card: {
      slots: {
        root: 'ring-1 ring-gray-200/60 dark:ring-gray-800/60 shadow-sm hover:shadow-md transition-shadow duration-300',
        body: 'flex flex-col gap-2'
      }
    },
    formField: {
      slots: {
        container: 'flex flex-col gap-2',
        help: 'm-0'
      }
    },
    link: {
      variants: {
        active: {
          false: 'text-dimmed'
        }
      }
    },
    container: {
      base: ''
    },
    toaster: {
      slots: {
        viewport: 'z-10001'
      }
    },
    icons: {
      loading: 'i-lucide-loader-circle',
      search: 'i-lucide-search',
      menu: 'i-lucide-menu'
    },
    experimental: {
      componentDetection: true
    },
    header: {
      slots: {
        root: 'bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50',
        container: 'flex items-center justify-between gap-3 h-full',
        left: 'lg:flex-1 flex items-center gap-1.5',
        center: 'hidden lg:flex',
        right: 'flex items-center justify-end lg:flex-1 gap-1.5',
        title:
          'shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5',
        toggle: 'lg:hidden',
        content: 'lg:hidden',
        overlay: 'lg:hidden',
        header:
          'px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3',
        body: 'p-4 sm:p-6 overflow-y-auto'
      },
      variants: {
        toggleSide: {
          left: {
            toggle: '-ms-1.5'
          },
          right: {
            toggle: '-me-1.5'
          }
        }
      },
      badge: {
        defaultVariants: {
          variant: 'subtle'
        }
      },
      input: {
        slots: {
          root: 'transition-all duration-200'
        }
      },
      avatar: {
        defaultVariants: {
          size: 'md'
        }
      },
      tooltip: {
        slots: {
          content: 'delay-300'
        }
      },
      navigationMenu: {
        slots: {
          root: 'transition-all duration-200'
        }
      }
    }
  }
})
