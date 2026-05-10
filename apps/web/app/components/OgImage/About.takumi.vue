<script setup lang="ts">
const { title, description } = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div
    class="w-full h-full flex flex-col bg-white text-neutral-900 relative overflow-hidden"
  >
    <!-- Teal accent bar at top -->
    <div class="h-3 bg-teal-500" />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col justify-center items-start p-20">
      <!-- Icon/Badge area -->
      <div class="mb-8 flex items-center gap-3">
        <div class="w-4 h-4 rounded-full bg-teal-500" />
        <span class="text-[20px] font-semibold text-teal-600 tracking-wide">
          {{ title.toUpperCase() }}
        </span>
      </div>

      <!-- Main title -->
      <h1
        class="text-[80px] font-bold m-0 leading-[1.1] mb-6 max-w-250"
        style="text-wrap: balance"
      >
        {{ title }}
      </h1>

      <!-- Description -->
      <p
        v-if="description"
        class="text-[36px] text-neutral-600 leading-[1.4] max-w-250 font-light"
      >
        {{ description }}
      </p>
    </div>

    <!-- Bottom right accent elements -->
    <div class="absolute bottom-0 right-0 opacity-10">
      <div class="w-75 h-75 rounded-full bg-teal-500" />
    </div>

    <!-- Additional accent line -->
    <div class="absolute bottom-20 right-20 w-0.5 h-15 bg-teal-500" />
  </div>
</template>
