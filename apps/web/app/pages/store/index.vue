<script setup lang="ts">
const title = 'Store'
const description
  = 'Welcome to the NodeWave store! Here you can find merchandise and accessories to show your support for our project.'

useSeoMeta({
  title,
  description,
  keywords: 'store, NodeWave, merchandise, accessories, support'
})

defineOgImage('Index', {
  title,
  description,
  meta: {
    theme: 'violet',
    layout: 'split',
    brand: 'nodewave'
  }
})
</script>

<template>
  <UContainer>
    <h1 class="text-3xl font-bold mb-4">
      Store
    </h1>
    <p class="text-lg text-muted-foreground">
      Welcome to the NodeWave store! Here you can find merchandise and
      accessories to show your support for our project. Stay tuned for upcoming
      products and exclusive offers.
    </p>
  </UContainer>
</template>
