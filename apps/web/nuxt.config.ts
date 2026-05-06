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
    '@nuxt/image'
  ],

  devtools: {
    enabled: true
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
