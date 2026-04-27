<script setup lang="ts">
import AppFooter from '~/components/ui/AppFooter.vue'
import AppHeader from '~/components/ui/AppHeader.vue'
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <UContainer fluid>
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </UContainer>
    </UMain>

    <AppFooter />
  </UApp>
</template>
