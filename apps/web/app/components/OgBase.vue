<script setup lang="ts">
import { computed } from 'vue'
import { useOgTheme } from '~/composables/useOgTheme'
import { useOgLayout } from '~/composables/useOgLayout'
import type { OgProps } from '~/og/types'

const props = defineProps<OgProps>()

const theme = computed(() => useOgTheme(props.meta?.theme ?? 'teal'))
const layout = computed(() => useOgLayout(props.meta?.layout ?? 'left'))
const brand = computed(() => props.meta?.brand ?? 'nodewave')

const titleUpper = computed(() => props.title?.toUpperCase() ?? '')
</script>

<template>
  <div
    class="relative w-full h-full flex overflow-hidden"
    :style="{ background: theme.bg, color: theme.text }"
  >
    <!-- top bar -->
    <div
      class="absolute top-0 left-0 w-full h-4"
      :style="{ background: theme.primary }"
    />

    <!-- glow -->
    <div class="absolute -bottom-64 -right-64 opacity-10">
      <div
        class="w-150 h-150 rounded-full"
        :style="{ background: theme.primary }"
      />
    </div>

    <!-- CENTER -->
    <OgCenter v-if="layout === 'center'">
      <div class="mb-8 flex items-center gap-3">
        <div
          class="w-3 h-3 rounded-full"
          :style="{ background: theme.primary }"
        />
        <span class="tracking-[0.3em] text-sm opacity-70">
          {{ titleUpper }}
        </span>
      </div>

      <h1 class="font-extrabold text-[86px] leading-[1.05]">
        {{ props.title }}
      </h1>

      <p
        v-if="props.description"
        class="mt-8 text-[34px] opacity-70"
      >
        {{ props.description }}
      </p>
    </OgCenter>

    <!-- LEFT -->
    <OgLeft v-else-if="layout === 'left'">
      <span class="text-sm tracking-[0.3em] opacity-70 mb-6">
        {{ titleUpper }}
      </span>

      <h1 class="font-extrabold text-[84px] leading-[1.05]">
        {{ props.title }}
      </h1>

      <p
        v-if="props.description"
        class="mt-8 text-[32px] opacity-70"
      >
        {{ props.description }}
      </p>
    </OgLeft>

    <!-- SPLIT -->
    <OgSplit v-else>
      <h1 class="font-extrabold text-[76px] leading-[1.05]">
        {{ props.title }}
      </h1>

      <p
        v-if="props.description"
        class="mt-6 text-[30px] opacity-70"
      >
        {{ props.description }}
      </p>

      <template #side>
        <div
          class="w-65 h-65 rounded-3xl rotate-12"
          :style="{ background: theme.primary }"
        />
      </template>
    </OgSplit>

    <!-- brand -->
    <div class="absolute bottom-10 right-12 text-sm opacity-60">
      {{ brand }}
    </div>
  </div>
</template>
