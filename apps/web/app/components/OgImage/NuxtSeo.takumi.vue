<script setup>
import { computed } from 'vue'

const props = defineProps({
  brand: { type: String, required: false, default: 'Nodewave' },
  colorMode: { type: String, required: false, default: 'light' },
  title: { type: String, required: false, default: 'title' },
  description: { type: String, required: false },
  isPro: { type: Boolean, required: false, default: true },
  width: { type: Number, required: false, default: 1200 },
  height: { type: Number, required: false, default: 600 }
})
const themeColor = computed(() =>
  props.isPro ? '124, 58, 237' : '34, 197, 94'
)
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-center items-center relative p-10 lg:p-15 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50"
  >
    <!-- Gradient background -->
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      :style="{
        backgroundImage: `radial-gradient(at 100% 100%, rgba(${themeColor}, 0.15), transparent)`
      }"
    />
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      :style="{
        backgroundImage: `radial-gradient(at 0% 0%, rgba(${themeColor}, 0.1), transparent)`
      }"
    />

    <div class="relative flex flex-col items-center text-center gap-5 lg:gap-8">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Logo"
          class="w-12 h-12"
        >
        <span class="text-[32px] lg:text-[42px] font-bold tracking-tight">
          {{ brand }}
        </span>
      </div>

      <div class="items-center justify-center w-full">
        <!-- Title -->
        <h1
          class="text-[48px] lg:text-[80px] font-bold m-0 leading-tight max-w-175 lg:max-w-250"
          style="
            display: block;
            line-clamp: 3;
            text-overflow: ellipsis;
            text-wrap: balance;
          "
        >
          {{ title }} - {{ brand }}
        </h1>
      </div>

      <!-- Description -->
      <p
        v-if="description"
        class="text-[24px] lg:text-[32px] text-center opacity-70 max-w-162.5 lg:max-w-225 leading-relaxed"
      >
        {{ description }}
      </p>

      <!-- Footer -->
      <div class="bottom-5 lg:bottom-10 text-lg mt-4 opacity-50">
        © {{ new Date().getFullYear() }} {{ brand }}. All rights reserved.
      </div>
    </div>
  </div>
</template>
