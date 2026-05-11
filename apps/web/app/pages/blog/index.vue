<script setup lang="ts">
const title = 'Blog'
const description
  = 'Welcome to the NodeWave blog! Here we share news, updates, and insights about our project and the broader ecosystem.'

useSeoMeta({
  title,
  description,
  keywords: 'blog, NodeWave, news, updates, insights'
})

useSeoMeta({
  twitterTitle: title,
  twitterDescription: description
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})

defineOgImage(
  'NuxtSeo.takumi',
  {
    title,
    description
  },
  {}
)
</script>

<template>
  <UContainer>
    <h1 class="text-3xl font-bold mb-4">
      Blog
    </h1>
    <p class="text-lg text-muted-foreground">
      Welcome to the NodeWave blog! Here we share news, updates, and insights
      about our project and the broader ecosystem. Stay tuned for the latest
      developments and deep dives into our technology.
    </p>
  </UContainer>
</template>
