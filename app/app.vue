<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Unlock the Power of Smart IoT Solutions'
const description
  = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtLoadingIndicator
    :height="3"
    color="repeating-linear-gradient(to right, #14b8a6 0%, #0d9488 50%, #2dd4bf 100%)"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
