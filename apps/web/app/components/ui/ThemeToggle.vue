<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
import { useTheme } from '~/composables/useTheme'
import { useKeyboard } from '~/composables/useKeyboard'

const colorMode = useColorMode()

const { newTheme, currentIcon, startViewTransition } = useTheme()
const { addGlobalShortcut, createElementKeyHandler } = useKeyboard()

addGlobalShortcut('shift+t', (e: KeyboardEvent) => {
  startViewTransition(e)
})

const elementKeyHandler = createElementKeyHandler(startViewTransition, [
  'enter',
  'space',
  't'
])
</script>

<template>
  <ClientOnly>
    <span class="sr-only"> Current theme: {{ colorMode }} </span>
    <UTooltip
      :text="`Switch to ${newTheme} mode`"
      :kbds="['Space', 'Shift+T']"
    >
      <UButton
        role="button"
        :aria-label="`Switch to ${newTheme} mode`"
        :aria-current-value="`Switch to ${newTheme} mode`"
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

<style lang="css">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}

::view-transition-old(root) {
  z-index: 1;
}
</style>
