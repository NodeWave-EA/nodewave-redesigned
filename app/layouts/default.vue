<template>
  <!-- Standard div wrapper to ensure a single root node -->
  <div>
    <UApp>
      <UHeader>
        <template #left>
          <NuxtLink
            to="/"
            aria-label="Home"
          >
            <AppLogo class="w-auto h-6 shrink-0" />
          </NuxtLink>
          <TemplateMenu />
        </template>
        <template #right>
          <UColorModeButton />
          <UButton
            to="https://github.com/nuxt-ui-templates/starter"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
            color="neutral"
            variant="ghost"
          />
        </template>
      </UHeader>

      <UMain>
        <UContainer fluid>
          <NuxtPage />
        </UContainer>
      </UMain>

      <UFooter>
        <template #left>
          <p class="text-sm text-muted">
            Built with Nuxt UI • © {{ new Date().getFullYear() }}
          </p>
        </template>
        <template #right>
          <UButton
            to="https://github.com/nuxt-ui-templates/starter"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
            color="neutral"
            variant="ghost"
          />
        </template>
      </UFooter>
    </UApp>
  </div>
</template>
