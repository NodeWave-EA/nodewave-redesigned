<script lang="ts" setup>
const route = useRoute()
useHead({
  title: 'Page Not Found',
  meta: [
    {
      name: 'description',
      content: 'The page you are looking for does not exist.'
    }
  ]
})
</script>

<template>
  <UError
    :clear="{
      color: 'neutral',
      size: 'xl',
      icon: 'i-lucide-arrow-left',
      class: 'rounded-full'
    }"
    :error="{
      statusCode: 404,
      statusMessage: `Page not found: ${route.path}`,
      message: 'The page you are looking for does not exist.'
    }"
  />
</template>
