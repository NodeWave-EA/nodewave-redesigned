<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <USeparator icon="i-simple-icons-nfc" />

  <UFooter role="contentinfo">
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
            v-for="link in footerLinks"
            :key="link.label"
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
