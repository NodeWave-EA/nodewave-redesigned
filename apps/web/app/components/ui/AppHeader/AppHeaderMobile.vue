<script setup lang="ts">
import { navLinks } from '~/utils/navLinks'
</script>

<template>
  <UNavigationMenu
    :items="navLinks"
    orientation="vertical"
    class="-mx-2.5"
  />
</template>
