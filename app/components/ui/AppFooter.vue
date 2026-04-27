<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  // { label: 'Privacy', to: '/privacy' },
  // { label: 'Terms', to: '/terms' },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <UFooter
    role="contentinfo"
    class="border-t border-default/60 bg-default/80 backdrop-blur supports-backdrop-filter:bg-default/65"
  >
    <div
      class="container mx-auto flex flex-col items-center gap-4 py-6 text-sm text-muted md:flex-row md:justify-between"
    >
      <!-- Left: copyright -->
      <p class="text-center md:text-left">
        &copy; {{ year }}
        <span class="font-medium text-default">NodeWave</span>. All rights
        reserved.
      </p>

      <!-- Right: links -->
      <nav aria-label="Footer navigation">
        <ul class="flex items-center gap-4">
          <li
            v-for="link in links"
            :key="link.to"
          >
            <NuxtLink
              :to="link.to"
              class="transition-colors hover:text-default"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </UFooter>
</template>
