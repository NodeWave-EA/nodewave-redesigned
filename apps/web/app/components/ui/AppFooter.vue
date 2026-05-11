<script setup lang="ts">
import { footerLinks } from '~/utils/footerLinks'
import { navLinks } from '~/utils/navLinks'
import { socialLinks } from '~/utils/socialLinks'
import { siteConfig } from '~/app.meta'

const year = new Date().getFullYear()

const connectLinks = [
  {
    label: 'Email us',
    to: `mailto:${siteConfig.email}`,
    icon: 'i-lucide-mail'
  },
  {
    label: 'Book a meeting',
    to: siteConfig.calendly,
    target: '_blank',
    rel: 'noopener noreferrer',
    external: true,
    icon: 'i-lucide-calendar-days'
  }
]

const socialActions = socialLinks.map(link => ({
  ...link,
  target: '_blank',
  rel: 'noopener noreferrer'
}))
</script>

<template>
  <UContainer>
    <UFooter
      :ui="{
        // top: 'border-b border-default/60',
        // bottom: 'py-6',
        // container: 'px-4 sm:px-6 lg:px-8'
      }"
    >
      <template #top>
        <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section>
            <div class="flex items-center gap-3">
              <UiAppLogo />
            </div>

            <p class="max-w-xl text-sm leading-7 text-muted sm:text-base">
              {{ siteConfig.description }}. We help teams plan, build, and ship
              reliable digital products across IoT, AI, integrations, and custom
              software.
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <UButton
                to="/contact"
                size="lg"
                icon="i-lucide-send"
                color="neutral"
                variant="solid"
                class="w-full justify-center sm:w-auto"
              >
                Start a project
              </UButton>

              <UButton
                :to="siteConfig.calendly"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                icon="i-lucide-calendar-days"
                color="neutral"
                variant="soft"
                class="w-full justify-center sm:w-auto"
              >
                Book a call
              </UButton>
            </div>
          </section>

          <nav
            aria-label="Footer links"
            class="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            <section class="min-w-0">
              <h3
                class="text-xs font-semibold uppercase tracking-[0.24em] text-muted"
              >
                Explore
              </h3>
              <ul class="mt-4 space-y-3">
                <li
                  v-for="link in navLinks"
                  :key="`explore-${link.label}`"
                >
                  <NuxtLink
                    :to="link.to"
                    class="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-default"
                  >
                    <UIcon
                      v-if="link.icon"
                      :name="link.icon"
                      class="size-4 shrink-0"
                    />
                    <span>{{ link.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </section>

            <section class="min-w-0">
              <h3
                class="text-xs font-semibold uppercase tracking-[0.24em] text-muted"
              >
                Resources
              </h3>
              <ul class="mt-4 space-y-3">
                <li
                  v-for="link in footerLinks"
                  :key="`resources-${link.label}`"
                >
                  <NuxtLink
                    :to="link.to"
                    class="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-default"
                  >
                    <UIcon
                      v-if="link.icon"
                      :name="link.icon"
                      class="size-4 shrink-0"
                    />
                    <span>{{ link.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </section>

            <section class="min-w-0">
              <h3
                class="text-xs font-semibold uppercase tracking-[0.24em] text-muted"
              >
                Connect
              </h3>
              <ul class="mt-4 space-y-3">
                <li
                  v-for="link in connectLinks"
                  :key="`connect-${link.label}`"
                >
                  <NuxtLink
                    :to="link.to"
                    :external="link.external"
                    :target="link.target"
                    :rel="link.rel"
                    class="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-default"
                  >
                    <UIcon
                      v-if="link.icon"
                      :name="link.icon"
                      class="size-4 shrink-0"
                    />
                    <span>{{ link.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </section>
          </nav>
        </div>
      </template>

      <template #bottom>
        <div
          class="flex flex-col-reverse items-center text-center md:flex-row md:justify-between md:text-left"
        >
          <p class="text-sm text-muted md:max-w-[65%]">
            &copy; {{ year }}
            <span class="font-medium text-default">NodeWave</span>. Transform
            your business. All rights reserved.
          </p>

          <div
            class="flex flex-wrap items-center justify-center gap-2 md:justify-end"
          >
            <UTooltip
              v-for="link in socialActions"
              :key="link.label"
              :text="link.label"
            >
              <UButton
                :to="link.to"
                :target="link.target"
                :rel="link.rel"
                :icon="link.icon"
                :aria-label="link.label"
                :title="link.label"
                color="neutral"
                variant="ghost"
                size="sm"
                square
              />
            </UTooltip>
          </div>
        </div>
      </template>
    </UFooter>
  </UContainer>
</template>
