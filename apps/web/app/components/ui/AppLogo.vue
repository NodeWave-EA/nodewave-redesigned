<script setup lang="ts"></script>

<template>
  <NuxtLink
    to="/"
    class="flex flex-col items-center gap-1 max-w-40 min-w-0 overflow-hidden md:flex-row md:gap-2"
  >
    <img
      src="/nodewave.svg"
      alt="Nodewave Logo"
      class="w-10 h-10 rounded-full border-2 border-default"
      width="40"
      height="40"
    >

    <div class="min-w-0 text-center md:text-left hidden md:block">
      <p class="text-sm font-semibold truncate">NodeWave</p>
    </div>
  </NuxtLink>
</template>
