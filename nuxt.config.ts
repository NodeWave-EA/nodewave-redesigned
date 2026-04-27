// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/a11y',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@vueuse/motion',
    '@nuxtjs/color-mode'
  ],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s | Nodewave',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#14b8a6' },
        { name: 'msapplication-TileColor', content: '#14b8a6' },
        { name: 'application-name', content: 'Nodewave' },
        { name: 'apple-mobile-web-app-title', content: 'Nodewave' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon-96x96.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/web-app-manifest-192x192.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: '/web-app-manifest-512x512.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '57x57',
          href: '/apple-touch-icon.png'
        },
        { rel: 'manifest', href: '/manifest.json' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },

  css: ['~/assets/css/main.css'],

  // SEO
  site: {
    name: process.env.NUXT_APP_NAME,
    url: process.env.NUXT_PUBLIC_SITE_URL
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  ui: {
    experimental: {
      componentDetection: true
    }
  },

  runtimeConfig: {
    public: {}
  },

  routeRules: {
    '/': { prerender: true },
    'about': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    // Global defaults to ensure consistency across all fonts
    defaults: {
      weights: [400, 500, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin']
    },
    families: [
      // SANS-SERIF
      { name: 'Inter', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Roboto', weights: [300, 400, 500, 700, 900] },
      { name: 'IBM Plex Sans', weights: [300, 400, 500, 600, 700] },

      // SERIF
      { name: 'Playfair Display', weights: [400, 700, 900] },
      { name: 'EB Garamond', weights: [400, 500, 700] },
      { name: 'Lora', weights: [400, 500, 600, 700] },

      // MONO
      { name: 'JetBrains Mono', weights: [400, 500, 700] },

      // TYPEWRITER
      { name: 'IBM Plex Mono', weights: [300, 400, 500, 600] },

      // ANALOG TYPEWRITER
      { name: 'Special Elite', weights: [400] }
    ]
  },

  icon: {
    size: '1.2em',
    class: 'icon',
    serverBundle: 'auto'
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Link Checker
  linkChecker: {
    enabled: true
  },

  // OG Image
  ogImage: {
    enabled: true
  },

  // Robots
  robots: {
    allow: '*'
  },

  // Schema.org
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'NODEWAVE.NET',
      logo: '/web-app-manifest-192x192.png',
      url: process.env.NUXT_PUBLIC_SITE_URL
    }
  }

  // scripts: {
  //   registry: {
  //     googleTagManager: {
  //       id: 'GTM-XXXXXXX',
  //       // Optional: Trigger on specific events for better performance
  //       trigger: 'onNuxtReady'
  //     }
  //   }
  // }
})
