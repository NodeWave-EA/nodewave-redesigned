<script setup lang="ts">
import { siteConfig } from '~/app.meta'

useSchemaOrg([
  {
    '@type': 'WebSite',
    '@id': `siteConfig.url}/#website`,
    'name': siteConfig.name,
    'url': siteConfig.url,
    'description': siteConfig.description
  }
])

const colorMode = useColorMode()
watch(
  () => colorMode.value,
  () => {
    if (!import.meta.client) return

    document.documentElement.classList.add('color-mode-transition')
    setTimeout(() => {
      document.documentElement.classList.remove('color-mode-transition')
    }, 350)
  }
)
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right, #14b8a6 0%, #0d9488 50%, #2dd4bf 100%)"
      :height="3"
    />
    <NuxtPage />
  </NuxtLayout>
</template>
