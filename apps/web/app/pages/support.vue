<script setup lang="ts">
const title = 'Support'
const description
  = 'If you need help or have any questions about NodeWave, please reach out to our support team.'

useSeoMeta({
  title,
  description,
  keywords: 'support, NodeWave, help, contact'
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
      Support
    </h1>
    <p class="text-lg text-muted-foreground">
      If you need help or have any questions about NodeWave, please don't
      hesitate to reach out to our support team. You can contact us via email at
      <a
        href="mailto:support@ nodewave.com"
        class="text-primary underline"
      >
        support@nodewave.com </a>.
    </p>
  </UContainer>
</template>
