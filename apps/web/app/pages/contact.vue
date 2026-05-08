<script setup lang="ts">
import * as z from 'zod'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { Link } from '~/types'

useSeoMeta({
  title: 'Contact',
  description:
    'Reach out to NodeWave to discuss IoT, AI, web, and custom software projects.'
})

const toast = useToast()

const links = ref<Link[]>([
  {
    label: 'Email us',
    to: 'mailto:info@nodewave.com',
    icon: 'i-lucide-mail',
    size: 'lg'
  },
  {
    label: 'Book a meeting',
    to: 'https://calendly.com/nodewave/30min',
    target: '_blank',
    icon: 'i-lucide-calendar-days',
    size: 'lg'
  }
])

type ContactDetail = {
  title: string
  description: string
  icon: string
  href?: string
}

const contactDetails: ContactDetail[] = [
  {
    title: 'Email',
    description: 'info@nodewave.com',
    icon: 'i-lucide-mail',
    href: 'mailto:info@nodewave.com'
  },
  {
    title: 'Typical response',
    description: 'Within one business day.',
    icon: 'i-lucide-clock-3'
  },
  {
    title: 'Discovery call',
    description: 'Start with a quick 30 minute intro call.',
    icon: 'i-lucide-calendar-range',
    href: 'https://calendly.com/nodewave/30min'
  }
]

const budgets = [
  'under 10k',
  '10k-50k',
  '50k-100k',
  '>100k',
  'Not sure yet',
  'Other'
] as const
const subjects = [
  'General Inquiry',
  'Technical Support',
  'Partner Relations',
  'IoT Solutions',
  'Integration Inquiry',
  'Custom Software Development',
  'Web Development',
  'Other'
] as const

const schema = z.object({
  firstName: z.string().trim().min(2, 'First name is required'),
  lastName: z.string().trim().min(2, 'Last name is required'),
  email: z.string().trim().email('Invalid email address'),
  phone: z.string().trim().optional(),
  subject: z.enum(subjects),
  budget: z.enum(budgets),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters long')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: undefined,
  budget: undefined,
  message: ''
})

const controlUi = {
  base: 'w-full min-w-0 rounded-2xl ps-11 pe-4 py-3 text-sm sm:ps-12 sm:pe-5 sm:py-3.5 sm:text-base lg:ps-14 lg:pe-5 lg:py-4',
  leadingIcon: 'text-muted shrink-0',
  trailingIcon: 'text-muted shrink-0'
}

const textareaUi = {
  base: 'w-full min-w-0 rounded-2xl ps-11 pe-4 py-3 text-sm min-h-40 sm:ps-12 sm:pe-5 sm:min-h-48 sm:py-3.5 sm:text-base lg:ps-14 lg:pe-5 lg:min-h-56 lg:py-4',
  leadingIcon: 'text-muted shrink-0',
  trailingIcon: 'text-muted shrink-0'
}

function validate(state: Partial<Schema>): FormError[] {
  const result = schema.safeParse(state)

  if (result.success) {
    return []
  }

  return result.error.issues.map(issue => ({
    field: String(issue.path[0] ?? ''),
    message: issue.message
  }))
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Message sent',
    description: 'Thanks for reaching out. We will get back to you soon.',
    color: 'success'
  })

  console.log(event.data)
}
</script>

<template>
  <UContainer class="py-8 sm:py-10 lg:py-12 px-0">
    <UPageHero
      headline="Get in touch"
      title="Let’s build something that actually moves the needle"
      description="Tell us what you are building, where you are stuck, or what you want to launch next. We work across IoT, AI, integrations, and custom software."
      :links="links"
      :ui="{
        headline:
          'uppercase tracking-[0.28em] text-xs font-semibold text-primary text-center',
        title:
          'max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-center mx-auto',
        description:
          'max-w-2xl text-sm sm:text-base text-muted text-center mx-auto',
        links: 'mt-6 justify-center'
      }"
      class="mx-auto"
    />

    <div class="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
      <section class="space-y-6 lg:sticky lg:top-8">
        <div
          class="rounded-4xl border border-default bg-elevated/70 p-6 shadow-sm backdrop-blur"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.28em] text-primary"
          >
            Contact options
          </p>

          <div class="mt-5 space-y-4">
            <div
              v-for="detail in contactDetails"
              :key="detail.title"
              class="flex items-start gap-4 rounded-2xl border border-default/60 bg-default/60 p-4 transition-colors hover:border-primary/30 hover:bg-default/80"
            >
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/10"
              >
                <UIcon
                  :name="detail.icon"
                  class="h-5 w-5"
                />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-default">
                  {{ detail.title }}
                </p>

                <a
                  v-if="detail.href"
                  :href="detail.href"
                  :target="
                    detail.href.startsWith('http') ? '_blank' : undefined
                  "
                  :rel="
                    detail.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  "
                  class="mt-1 block text-sm text-muted transition-colors hover:text-primary"
                >
                  {{ detail.description }}
                </a>

                <p
                  v-else
                  class="mt-1 text-sm text-muted"
                >
                  {{ detail.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div
            class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm"
          >
            <p class="text-sm font-medium text-default">
              Fast start
            </p>
            <p class="mt-2 text-sm text-muted">
              Share the scope, timeline, and what success looks like. We will
              respond with the next best step.
            </p>
          </div>

          <div
            class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm"
          >
            <p class="text-sm font-medium text-default">
              Flexible engagement
            </p>
            <p class="mt-2 text-sm text-muted">
              From quick fixes to end-to-end builds, we can support projects at
              different stages.
            </p>
          </div>
        </div>
      </section>

      <section
        class="overflow-hidden rounded-4xl border border-default bg-elevated/80 shadow-sm backdrop-blur"
      >
        <div
          class="border-b border-default/70 bg-linear-to-br from-primary/6 via-transparent to-transparent p-6 sm:p-8"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.28em] text-primary"
              >
                Send a message
              </p>
              <h2
                class="mt-2 text-2xl font-semibold tracking-tight text-default sm:text-3xl"
              >
                Tell us about your project
              </h2>
              <p
                class="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base"
              >
                We’ll use the details below to route your request to the right
                person and come back with next steps.
              </p>
            </div>

            <UIcon
              name="i-lucide-message-square-more"
              class="h-9 w-9 text-primary/60"
            />
          </div>
        </div>

        <UForm
          class="p-6 sm:p-8"
          :state="state"
          :validate="validate"
          @submit="onSubmit"
        >
          <div class="space-y-6">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.22em] text-muted"
              >
                Your details
              </p>

              <div class="mt-4 grid grid-cols-2 gap-4 sm:gap-5">
                <UFormField
                  name="firstName"
                  label="First name"
                  required
                  class="w-full min-w-0"
                >
                  <UInput
                    v-model="state.firstName"
                    icon="i-lucide-user"
                    placeholder="John"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="false"
                    class="w-full min-w-0"
                    :ui="controlUi"
                  />
                </UFormField>

                <UFormField
                  name="lastName"
                  label="Last name"
                  required
                  class="w-full min-w-0"
                >
                  <UInput
                    v-model="state.lastName"
                    icon="i-lucide-id-card"
                    placeholder="Doe"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="false"
                    class="w-full min-w-0"
                    :ui="controlUi"
                  />
                </UFormField>

                <UFormField
                  name="email"
                  label="Email"
                  required
                  class="w-full min-w-0"
                >
                  <UInput
                    v-model="state.email"
                    icon="i-lucide-mail"
                    type="email"
                    placeholder="john.doe@example.com"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="false"
                    class="w-full min-w-0"
                    :ui="controlUi"
                  />
                </UFormField>

                <UFormField
                  name="phone"
                  label="Phone"
                  class="w-full min-w-0"
                >
                  <UInput
                    v-model="state.phone"
                    icon="i-lucide-phone"
                    type="tel"
                    placeholder="+1 555 123 4567"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="false"
                    class="w-full min-w-0"
                    :ui="controlUi"
                  />
                </UFormField>
              </div>
            </div>

            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.22em] text-muted"
              >
                Project details
              </p>

              <div class="mt-4 grid grid-cols-2 gap-4 sm:gap-5">
                <UFormField
                  name="subject"
                  label="Subject"
                  required
                  class="w-full min-w-0"
                >
                  <USelectMenu
                    v-model="state.subject"
                    :items="[...subjects]"
                    icon="i-lucide-layout-list"
                    placeholder="Choose a topic"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="false"
                    class="w-full min-w-0"
                    :ui="controlUi"
                  />
                </UFormField>

                <UFormField
                  name="budget"
                  label="Budget"
                  required
                  class="w-full min-w-0"
                >
                  <USelectMenu
                    v-model="state.budget"
                    :items="[...budgets]"
                    icon="i-lucide-banknote"
                    placeholder="Estimated budget"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="false"
                    class="w-full min-w-0"
                    :ui="controlUi"
                  />
                </UFormField>
              </div>
            </div>
          </div>

          <UFormField
            name="message"
            label="Message"
            required
            class="mt-6 w-full"
          >
            <UTextarea
              v-model="state.message"
              icon="i-lucide-message-square-text"
              :rows="6"
              autoresize
              :maxrows="10"
              placeholder="Share a little about the project, timelines, and what you need help with."
              color="neutral"
              variant="soft"
              size="lg"
              :highlight="false"
              class="w-full min-h-40 sm:min-h-48 lg:min-h-56"
              :ui="textareaUi"
            />
          </UFormField>

          <div
            class="mt-6 flex flex-col gap-4 border-t border-default/70 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <p class="text-sm text-muted">
              We typically reply within one business day.
            </p>

            <UButton
              type="submit"
              size="lg"
              trailing-icon="i-lucide-arrow-right"
            >
              Send message
            </UButton>
          </div>
        </UForm>
      </section>
    </div>
  </UContainer>
</template>
