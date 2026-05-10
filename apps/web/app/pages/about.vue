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
</script>

<template>
  <UContainer>
    <h1 class="text-4xl font-bold mb-4">
      About NodeWave
    </h1>
    <p class="text-lg text-muted-foreground mb-8">
      NodeWave is a Nuxt 3 starter template designed to help you build
      beautiful, accessible, and performant applications in minutes. It includes
      a collection of pre-built UI components, layouts, and pages that you can
      use as a starting point for your next project.
    </p>

    <h2 class="text-2xl font-semibold mb-4">
      Features
    </h2>
    <ul class="list-disc list-inside mb-8">
      <li>Built with Nuxt 3 and Vue 3</li>
      <li>Pre-designed UI components using Nuxt UI</li>
      <li>Responsive layouts for mobile and desktop</li>
      <li>SEO-friendly with dynamic meta tags</li>
      <li>Easy to customize and extend</li>
    </ul>

    <h2 class="text-2xl font-semibold mb-4">
      Get Started
    </h2>
    <p class="text-lg text-muted-foreground mb-4">
      To get started with NodeWave, check out the documentation and explore the
      codebase. You can also join the community on Discord to ask questions and
      share your projects built with NodeWave.
    </p>

    <UButton
      as="a"
      href="https://github.com/nuxt-ui-templates/starter"
      target="_blank"
      rel="noopener noreferrer"
    >
      Use this template
    </UButton>
  </UContainer>
</template>
