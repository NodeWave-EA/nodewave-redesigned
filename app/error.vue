<script lang="ts" setup>
import AppHeader from '~/components/ui/AppHeader.vue'

const error = useError()
const navLinks = useNavLinks()

useSeoMeta({
  title: error.value?.status?.toString(),
  description: error.value?.message?.toString()
})
</script>

<template>
  <UApp>
    <AppHeader :links="navLinks" />
    <UMain>
      <UContainer
        class="min-h-screen flex flex-col items-center justify-center text-center"
      >
        <h1 class="text-6xl font-bold mb-4">
          {{ error?.status }}
        </h1>
        <p class="text-xl text-muted mb-8">
          {{ error?.message }}
        </p>
        <NuxtLink
          to="/"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Go back home
        </NuxtLink>
      </UContainer>
    </UMain>
    <AppHeader />
  </UApp>
</template>
