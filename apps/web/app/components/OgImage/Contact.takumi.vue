<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-teal-900 via-slate-900 to-slate-950 p-12"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
    </div>

    <div class="relative z-10 text-center space-y-8 max-w-2xl">
      <div class="text-8xl">
        {{ emoji }}
      </div>

      <h1 class="text-6xl font-bold text-white leading-tight">
        {{ title }}
      </h1>

      <p class="text-3xl text-teal-300 font-semibold">
        {{ subtitle }}
      </p>

      <p class="text-xl text-slate-400 mt-8">
        Let's discuss your IoT, AI, or custom software project
      </p>
    </div>

    <div class="absolute bottom-8 right-8 text-right text-slate-400">
      <p class="text-sm">
        NodeWave
      </p>
      <p class="text-xs text-slate-500">
        IoT • AI • Software
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    emoji?: string
  }>(),
  {
    title: 'Let\'s Build Something Together',
    subtitle: 'Contact NodeWave',
    emoji: '💬'
  }
)
</script>
