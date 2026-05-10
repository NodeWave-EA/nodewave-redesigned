<script setup lang="ts">
const title = 'About'
const description = 'NodeWave aboutt page'

useSeoMeta({
  title,
  description,
  keywords:
    'about, NodeWave, Nuxt 3 starter template, features, getting started'
})
defineOgImage('About', { title, description })

// No imports needed! The @vueuse/motion/nuxt module handles auto-imports.
const boxVisible = ref(true)
</script>

<template>
  <div class="p-8 space-y-12 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold">
      VueUse Motion Showcase
    </h1>

    <!-- 1. Basic Directive Usage -->
    <section>
      <h2 class="text-xl font-semibold mb-4">
        1. Directives (Fade & Slide)
      </h2>
      <!-- v-motion automatically handles initial and enter states -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
        class="w-32 h-32 bg-green-500 rounded-xl flex items-center justify-center text-white"
      >
        v-motion
      </div>
    </section>

    <!-- 2. Gestures (Hover & Tap) -->
    <section>
      <h2 class="text-xl font-semibold mb-4">
        2. Interaction Gestures
      </h2>
      <div class="flex gap-4">
        <button
          v-motion
          :initial="{ scale: 1 }"
          :hovered="{ scale: 1.1, rotate: 5 }"
          :tapped="{ scale: 0.9 }"
          class="px-6 py-3 bg-orange-600 text-white rounded-lg shadow-lg"
        >
          Interactive Button
        </button>
      </div>
    </section>

    <!-- 3. Visible Trigger (Scroll) -->
    <section>
      <h2 class="text-xl font-semibold mb-4">
        3. In-View Trigger
      </h2>
      <div
        class="h-64 flex items-center justify-center border-2 border-dashed rounded-xl"
      >
        <!-- 'visible' triggers when the element enters the viewport -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :visible="{ opacity: 1, scale: 1 }"
          class="p-10 bg-blue-500 rounded-lg text-white font-bold"
        >
          I animate when visible!
        </div>
      </div>
    </section>

    <!-- 4. Variant Control -->
    <section>
      <h2 class="text-xl font-semibold mb-4">
        4. Manual Controls (Variants)
      </h2>
      <button
        class="mb-4 text-sm bg-gray-200 px-2 py-1 rounded"
        @click="boxVisible = !boxVisible"
      >
        Toggle State
      </button>

      <div
        v-motion="'customBox'"
        :variants="{
          hidden: { opacity: 0.2, x: -50 },
          visible: { opacity: 1, x: 0 }
        }"
        :initial="'hidden'"
        :animate="boxVisible ? 'visible' : 'hidden'"
        class="w-20 h-20 bg-red-400 rounded-full"
      />
    </section>
  </div>
</template>
