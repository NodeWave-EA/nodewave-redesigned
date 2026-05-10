<script setup lang="ts">
import { computed } from 'vue'
import { presets } from '~/og/presets'
import type { OgProps } from '~/og/types'

const props = defineProps<OgProps>()

const preset = presets.product

const meta = computed(() => ({
  theme: props.meta?.theme ?? preset.theme,
  layout: props.meta?.layout ?? preset.layout,
  brand: props.meta?.brand ?? 'nodewave'
}))
</script>

<template>
  <OgBase
    :title="props.title ?? 'Contact'"
    :description="props.description"
    :meta="meta"
  />
</template>
