<script setup lang="ts">
const title = 'Store'
const description
  = 'Welcome to the NodeWave store! Here you can find merchandise and accessories to show your support for our project.'

useSeoMeta({
  title,
  description,
  keywords: 'store, NodeWave, merchandise, accessories, support'
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
    <h1>Store</h1>

    <p class="text-lg text-muted-foreground">
      Welcome to the NodeWave store! Here you can find merchandise and
      accessories to show your support for our project. Stay tuned for upcoming
      products and exclusive offers.
    </p>
  </UContainer>
</template>
