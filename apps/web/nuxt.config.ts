import { siteConfig } from './app/app.meta'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-aos',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/seo',
    '@nuxt/a11y',
    '@nuxt/scripts',
    '@nuxt/icon',
    '@nuxt/hints',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-schema-org',
    [
      'nuxt-og-image',
      {
        componentDirs: ['~/components/OgImage'],
        browsers: {
          chromium: ['/usr/bin/chromium']
        }
      }
    ],
    '@nuxtjs/turnstile',
    'nuxt-ai-ready'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s | NodeWave',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#14b8a6' },
        { name: 'msapplication-TileColor', content: '#14b8a6' },
        {
          name: 'msapplication-TileImage',
          content: '/web-app-manifest-192x192.png'
        },
        { name: 'application-name', content: 'NodeWave' },
        { name: 'apple-mobile-web-app-title', content: 'NodeWave' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon-96x96.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '192x192',
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

  router: {
    options: { scrollBehaviorType: 'smooth' }
  },

  site: {
    name: siteConfig.name,
    url: siteConfig.url,
    defaultLocale: 'en'
  },

  appConfig: {},

  runtimeConfig: {
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/_nuxt/**': {
      cache: {
        maxAge: 2592000,
        staleMaxAge: 31536000
      }
    }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  aiReady: {
    autoI18n: true,
    cron: true,
    indexNow: true,
    runtimeSync: {
      ttl: 3600,
      batchSize: 20,
      pruneTtl: 0
    },
    contentSignal: {
      search: true,
      aiInput: true
    }
  },

  aos: {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  fonts: {
    defaults: {
      weights: [400, 500, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin']
    },
    families: [
      { name: 'Poppins', weights: [400, 500, 600, 700] },
      { name: 'Inter', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Roboto', weights: [300, 400, 500, 700, 900] },
      { name: 'IBM Plex Sans', weights: [300, 400, 500, 600, 700] },

      { name: 'Playfair Display', weights: [400, 700, 900] },
      { name: 'EB Garamond', weights: [400, 500, 700] },
      { name: 'Lora', weights: [400, 500, 600, 700] },

      { name: 'JetBrains Mono', weights: [400, 500, 700] },

      { name: 'IBM Plex Mono', weights: [300, 400, 500, 600] },

      { name: 'Special Elite', weights: [400] }
    ]
  },

  // ── Hints ──────────────────────────────────────────────────
  hints: {
    features: {
      lazyLoad: false
    }
  },
  icon: {
    size: '1.2em',
    class: 'icon',
    serverBundle: 'auto',
    fetchTimeout: 4000,
    clientBundle: {
      scan: true
    }
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

  // ── Link Checker ───────────────────────────────────────────
  linkChecker: {
    enabled: true
  },

  // ── OG Image ───────────────────────────────────────────────
  ogImage: {
    enabled: true
  },

  // ── Robots ─────────────────────────────────────────────────
  robots: {},
  sitemap: {
    autoLastmod: true,
    discoverImages: true,
    exclude: ['/app/**', '/api/**', '/_nuxt/**', '/__nuxt_content/**'],
    debug: false,
    xslColumns: [
      { label: 'URL', width: '60%' },
      {
        label: 'Images',
        width: '20%',
        select: 'count(image:image)'
      },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '20%' }
    ]
  },

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY
  }
})
