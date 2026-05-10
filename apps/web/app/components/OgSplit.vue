<script setup lang="ts">
import type { OgProps } from '~/og/types'

defineProps<OgProps>()
</script>

<template>
  <div class="flex w-full h-full">
    <div class="flex-1 flex flex-col justify-center px-20">
      <slot />
    </div>

    <div class="w-[35%] flex items-center justify-center">
      <slot name="side" />
    </div>
  </div>
</template>
