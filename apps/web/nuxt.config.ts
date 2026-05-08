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
    'nuxt-og-image'
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

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
