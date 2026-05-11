<script setup lang="ts">
import { navLinks } from '~/utils/navLinks'

const { headerClass, containerClass } = useFloatingHeader()
</script>

<template>
  <UHeader
    mode="slideover"
    :class="headerClass"
    :ui="{
      root: 'bg-transparent border-0 ring-0',
      container: containerClass,
      left: 'flex items-center',
      center: 'hidden md:flex',
      right: 'flex items-center gap-2',
      body: 'border-0'
    }"
  >
    <!-- Logo -->
    <template #title>
      <UiAppLogo />
    </template>

    <!-- Desktop Navigation -->
    <UNavigationMenu
      :items="navLinks"
      class="hidden md:flex"
    />

    <!-- Right Actions -->
    <template #right>
      <div class="flex items-center gap-2">
        <UiAppHeaderActions />
      </div>
    </template>

    <!-- Mobile Navigation -->
    <template #body>
      <UiAppHeaderMobile />
    </template>
  </UHeader>
</template>
