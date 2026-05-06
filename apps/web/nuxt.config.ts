// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-aos',
    '@vueuse/nuxt',
    '@vueuse/motion',
    '@nuxtjs/color-mode',
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

  // Ensure color mode respects the user's system preference
  // and adds the plain `dark` class (no suffix) so our CSS `.dark` rules work.
  colorMode: {
    preference: 'system',
    classSuffix: ''
  },

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
