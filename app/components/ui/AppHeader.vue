<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import ThemeToggle from '~/components/ui/ThemeToggle.vue'
import AppLogo from '~/components/ui/AppLogo.vue'

// Track page scroll
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 0)
</script>

<template>
  <UHeader
    mode="drawer"
    :data-scroll="isScrolled"
    class="group"
    :ui="{
      root: 'mx-2 pt-4 bg-transparent border-none backdrop-blur-none',
      container:
        'max-w-(--ui-container) rounded-xl border border-default bg-default/50 backdrop-blur-lg transition-all duration-200 ease-out group-data-[scroll=true]:shadow-xl'
    }"
  >
    <!-- Logo / Title -->
    <template #title>
      <AppLogo />
    </template>

    <!-- Desktop navigation -->
    <UNavigationMenu :items="navLinks" />

    <!-- Right actions -->
    <template #right>
      <ThemeToggle />

      <UTooltip
        text="Open on GitHub"
        :kbds="['meta', 'G']"
      >
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="Open GitHub repository"
        />
      </UTooltip>
    </template>

    <!-- Mobile menu -->
    <template #body>
      <UNavigationMenu
        :items="navLinks"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
