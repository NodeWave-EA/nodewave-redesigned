<script lang="ts" setup>
import { useTheme } from '~/composables/useTheme'
import { useKeyboard } from '~/composables/useKeyboard'

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const colorMode = useColorMode()

const { newTheme, currentIcon, startViewTransition } = useTheme()
const { addGlobalShortcut, createElementKeyHandler } = useKeyboard()

onMounted(() => {
  addGlobalShortcut('shift+t', (e: KeyboardEvent) => {
    startViewTransition(e)
  })
})

const elementKeyHandler = createElementKeyHandler(startViewTransition, [
  'enter',
  'space',
  't'
])
</script>

<template>
  <ClientOnly>
    <span
      v-if="mounted"
      class="sr-only"
    >
      Current theme: {{ colorMode.value }}
    </span>

    <UTooltip
      v-if="mounted"
      :text="`Switch to ${newTheme} mode`"
      :kbds="['Space', 'Shift+T']"
    >
      <UButton
        role="button"
        :aria-label="`Switch to ${newTheme} mode`"
        :icon="`i-lucide-${currentIcon}`"
        color="neutral"
        variant="ghost"
        size="md"
        class="rounded-full cursor-pointer bg-transparent hover:bg-primary/10 dark:hover:bg-primary/20 transition"
        @click="startViewTransition"
        @keydown="elementKeyHandler"
      />

      <template #fallback>
        <UButton
          role="button"
          :aria-label="`Switch to ${newTheme} mode`"
          :icon="`i-lucide-${currentIcon}`"
          color="neutral"
          variant="ghost"
          size="md"
          class="rounded-full bg-red-600"
          @click="startViewTransition"
          @keydown="elementKeyHandler"
        />
      </template>
    </UTooltip>
  </ClientOnly>
</template>
