import { siteConfig } from './app/app.meta'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-aos',
    '@vueuse/nuxt',
    '@vueuse/motion',
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
    ]
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
  runtimeConfig: {},

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
  }
})
