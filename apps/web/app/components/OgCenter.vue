<script setup lang="ts">
import type { OgProps } from '~/og/types'

defineProps<OgProps>()
</script>

<template>
  <div
    class="flex-1 flex flex-col justify-center items-center text-center px-24"
  >
    <slot />
  </div>
</template>
