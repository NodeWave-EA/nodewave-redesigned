<script setup lang="ts">
const title = 'Terms of Service'
const description
  = 'These are the terms of service for the NodeWave website. By using our services, you agree to these terms and conditions.'

useSeoMeta({
  title,
  description,
  keywords: 'terms of service, NodeWave, legal, conditions'
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
      Terms of Service
    </h1>
    <p class="text-lg text-muted-foreground">
      These are the terms of service for the NodeWave website. By using our
      services, you agree to these terms and conditions. Please read them
      carefully.
    </p>
  </UContainer>
</template>
