<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Link } from '~/types'
import { siteConfig } from '~/app.meta'

const title = 'Contact'
const description = `Get in touch with ${siteConfig.name} to discuss IoT, AI, web, and custom software projects. ${siteConfig.description}`

useSeoMeta({
  title,
  description,
  keywords:
    'contact, IoT solutions, AI development, custom software, web development'
})

defineOgImage('Contact', {
  title,
  description
})

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      'name': siteConfig.name,
      'url': siteConfig.url,
      'logo': {
        '@type': 'ImageObject',
        'url': siteConfig.logo,
        'width': 200,
        'height': 200
      },
      'description': siteConfig.description,
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Service',
        'email': siteConfig.email,
        'availableLanguage': ['en'],
        'url': `${siteConfig.url}/contact`
      },
      'sameAs': [
        'https://twitter.com/nodewave',
        'https://linkedin.com/company/nodewave',
        'https://github.com/nodewave-ea'
      ]
    },
    {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/contact#webpage`,
      'url': `${siteConfig.url}/contact`,
      'name': `Contact ${siteConfig.name}`,
      'description': `Get in touch with ${siteConfig.name} to discuss IoT, AI, web, and custom software projects.`,
      'isPartOf': {
        '@id': `${siteConfig.url}/#website`
      },
      'primaryImageOfPage': {
        '@type': 'ImageObject',
        'url': siteConfig.logo,
        'width': 1200,
        'height': 630
      }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteConfig.url}/contact#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `${siteConfig.url}/`
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Contact',
          'item': `${siteConfig.url}/contact`
        }
      ]
    }
  ]
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemaOrg)
    }
  ]
})

const toast = useToast()

const links = ref<Link[]>([
  {
    label: 'Email us',
    to: `mailto:${siteConfig.email}`,
    icon: 'i-lucide-mail',
    size: 'lg'
  },
  {
    label: 'Book a meeting',
    to: siteConfig.calendly,
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
    description: siteConfig.email,
    icon: 'i-lucide-mail',
    href: `mailto:${siteConfig.email}`
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
    href: siteConfig.calendly
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
  base: 'w-full min-w-0 ps-11 pe-4 py-3 text-xl sm:text-xl sm:ps-12 sm:pe-5 sm:py-3.5 sm:text-base lg:ps-14 lg:pe-5 lg:py-4',
  leadingIcon: 'text-muted shrink-0',
  trailingIcon: 'text-muted shrink-0'
}

const textareaUi = {
  base: 'w-full min-w-0 text-sm min-h-40 sm:min-h-48 sm:text-base lg:min-h-56',
  leadingIcon: 'text-muted shrink-0',
  trailingIcon: 'text-muted shrink-0'
}

// Inline validation state
const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})
const submitted = ref(false)

let _validateTimer: ReturnType<typeof setTimeout> | null = null

function validate(
  state: Partial<Schema>
): { field: string, message: string }[] {
  const result = schema.safeParse(state)

  // clear previous errors
  Object.assign(errors, {})

  if (result.success) {
    return []
  }

  result.error.issues.forEach((issue) => {
    const field = String(issue.path[0] ?? '')
    errors[field] = issue.message
  })

  return result.error.issues.map(issue => ({
    field: String(issue.path[0] ?? ''),
    message: issue.message
  }))
}

function showError(name: string) {
  return !!errors[name] && (touched[name] || submitted.value)
}

function markTouched(name: string) {
  touched[name] = true
}

watch(
  () => state,
  () => {
    if (_validateTimer) clearTimeout(_validateTimer)
    _validateTimer = setTimeout(() => validate(state), 350)
  },
  { deep: true }
)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // mark submission attempt so errors become visible
  submitted.value = true

  // final validation before submit
  const issues = validate(state)

  if (issues.length > 0) {
    // focus first invalid field if possible
    const first = issues[0]!
    const el = document.querySelector(
      `[name="${first.field}"]`
    ) as HTMLElement | null
    el?.focus()
    return
  }

  toast.add({
    title: 'Message sent',
    description: 'Thanks for reaching out. We will get back to you soon.',
    color: 'success'
  })

  console.log(event.data)
}
</script>

<template>
  <UContainer class="py-0 px-0">
    <UPageHero
      headline="Get in touch"
      title="Let's build something Amazing together"
      description="Tell us what you are building, where you are stuck, or what you want to launch next. We work across IoT, AI, integrations, and custom software."
      :links="links"
      :ui="{
        headline:
          'uppercase tracking-[0.28em] text-xs font-semibold text-primary text-center',
        title:
          'hidden max-w-3xl text-3xl font-semibold tracking-tight text-center mx-auto sm:block sm:text-4xl lg:text-5xl',
        description:
          'hidden max-w-2xl text-sm text-muted text-center mx-auto sm:block sm:text-base',
        links: 'hidden mt-6 justify-center sm:flex'
      }"
      class="hidden mx-auto sm:my-0 sm:block"
    />

    <div
      class="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-start"
    >
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
          class="border-b border-default/70 bg-linear-to-br from-primary/6 via-transparent to-transparent p-4 sm:p-6"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.28em] text-primary"
              >
                Send a message
              </p>
              <h1
                class="mt-1 text-2xl font-semibold tracking-tight text-default sm:mt-2 sm:text-3xl"
              >
                Tell us about your project
              </h1>
              <p
                class="mt-2 max-w-2xl text-sm leading-6 text-muted sm:mt-3 sm:text-base"
              >
                We'll use the details below to route your request to the right
                person and come back with next steps.
              </p>
            </div>
          </div>
        </div>

        <UForm
          class="p-4 sm:p-6"
          aria-label="Contact us form"
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

              <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <UFormField
                  name="firstName"
                  label="First name"
                  :ui="{ label: 'text-xl sm:text-base' }"
                  required
                  class="w-full min-w-0"
                >
                  <UInput
                    v-model="state.firstName"
                    name="firstName"
                    icon="i-lucide-user"
                    placeholder="John"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
                    class="w-full min-w-0"
                    :ui="controlUi"
                    @blur="markTouched('firstName')"
                  />
                  <p
                    v-if="showError('firstName')"
                    class="mt-2 text-xs text-red-500"
                  >
                    {{ errors.firstName }}
                  </p>
                </UFormField>

                <UFormField
                  name="lastName"
                  label="Last name"
                  required
                  class="w-full min-w-0"
                  :ui="{ label: 'text-xl sm:text-base' }"
                >
                  <UInput
                    v-model="state.lastName"
                    name="lastName"
                    icon="i-lucide-id-card"
                    placeholder="Doe"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
                    class="w-full min-w-0"
                    :ui="controlUi"
                    @blur="markTouched('lastName')"
                  />
                  <p
                    v-if="showError('lastName')"
                    class="mt-2 text-xs text-red-500"
                  >
                    {{ errors.lastName }}
                  </p>
                </UFormField>

                <UFormField
                  name="email"
                  label="Email"
                  required
                  class="w-full min-w-0"
                  :ui="{ label: 'text-xl sm:text-base' }"
                >
                  <UInput
                    v-model="state.email"
                    name="email"
                    icon="i-lucide-mail"
                    type="email"
                    placeholder="john.doe@example.com"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
                    class="w-full min-w-0"
                    :ui="controlUi"
                    @blur="markTouched('email')"
                  />
                  <p
                    v-if="showError('email')"
                    class="mt-2 text-xs text-red-500"
                  >
                    {{ errors.email }}
                  </p>
                </UFormField>

                <UFormField
                  name="phone"
                  label="Phone"
                  class="w-full min-w-0"
                  :ui="{ label: 'text-xl sm:text-base' }"
                >
                  <UInput
                    v-model="state.phone"
                    name="phone"
                    icon="i-lucide-phone"
                    type="tel"
                    placeholder="+1 555 123 4567"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
                    class="w-full min-w-0"
                    :ui="controlUi"
                    @blur="markTouched('phone')"
                  />
                  <p
                    v-if="showError('phone')"
                    class="mt-2 text-xs text-red-500"
                  >
                    {{ errors.phone }}
                  </p>
                </UFormField>
              </div>
            </div>

            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.22em] text-muted"
              >
                Project details
              </p>

              <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <UFormField
                  name="subject"
                  label="Subject"
                  required
                  class="w-full min-w-0"
                  :ui="{ label: 'text-xl sm:text-base' }"
                >
                  <USelectMenu
                    v-model="state.subject"
                    name="subject"
                    :items="[...subjects]"
                    icon="i-lucide-layout-list"
                    placeholder="Choose a topic"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
                    class="w-full min-w-0"
                    :ui="controlUi"
                    @blur="markTouched('subject')"
                  />
                  <p
                    v-if="showError('subject')"
                    class="mt-2 text-xs text-red-500"
                  >
                    {{ errors.subject }}
                  </p>
                </UFormField>

                <UFormField
                  name="budget"
                  label="Budget"
                  required
                  class="w-full min-w-0"
                  :ui="{ label: 'text-xl sm:text-base' }"
                >
                  <USelectMenu
                    v-model="state.budget"
                    name="budget"
                    :items="[...budgets]"
                    icon="i-lucide-banknote"
                    placeholder="Estimated budget"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
                    class="w-full min-w-0"
                    :ui="controlUi"
                    @blur="markTouched('budget')"
                  />
                  <p
                    v-if="showError('budget')"
                    class="mt-2 text-xs text-red-500"
                  >
                    {{ errors.budget }}
                  </p>
                </UFormField>
              </div>
            </div>
          </div>

          <UFormField
            name="message"
            label="Message"
            required
            class="mt-6 w-full"
            :ui="{ label: 'text-xl sm:text-base' }"
          >
            <UTextarea
              v-model="state.message"
              name="message"
              :rows="6"
              autoresize
              :maxrows="10"
              placeholder="Share a little about the project, timelines, and what you need help with."
              color="neutral"
              variant="soft"
              size="lg"
              :highlight="true"
              class="w-full min-h-40 sm:min-h-48 lg:min-h-56"
              :ui="textareaUi"
              @blur="markTouched('message')"
            />
            <p
              v-if="showError('message')"
              class="mt-2 text-xs text-red-500"
            >
              {{ errors.message }}
            </p>
          </UFormField>

          <div
            class="mt-6 flex flex-col gap-4 border-t border-default/70 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <UButton
              type="submit"
              size="lg"
              trailing-icon="i-lucide-arrow-right"
            >
              Send message
            </UButton>

            <p class="text-sm text-muted">
              We typically reply within one business day.
            </p>
          </div>
        </UForm>
      </section>
    </div>
  </UContainer>
</template>
