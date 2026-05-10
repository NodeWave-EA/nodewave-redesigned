<script setup lang="ts">
const title = 'Privacy Policy'
const description
  = 'This is a simple privacy policy for the NodeWave website. We are committed to protecting your personal information and your right to privacy.'

useSeoMeta({
  title,
  description,
  keywords: 'privacy policy, NodeWave, privacy, data protection'
})

defineOgImage('Index', {
  title,
  description,
  meta: {
    theme: 'dark',
    layout: 'left',
    brand: 'nodewave'
  }
})
</script>

<template>
  <UContainer>
    <h1 class="text-3xl font-bold mb-4">
      Privacy Policy
    </h1>
    <p class="text-lg text-muted-foreground">
      This is a simple privacy policy for the NodeWave website. We are committed
      to protecting your personal information and your right to privacy. If you
      have any questions about how we collect, use, or share your personal
      information, please contact us.
    </p>
  </UContainer>
</template>
