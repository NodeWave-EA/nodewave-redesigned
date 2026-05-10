<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Link } from '~/types'
import { siteConfig } from '~/app.meta'
import { ContactSchema } from '#shared/schemas'
import { budgets, subjects } from '#shared/types'
import { useContact } from '~/composables/useContact'
import type { ContactFormData as Schema } from '~~/shared/schemas'
import type { ContactFieldError } from '#shared/types'

const title = 'Contact'
const description = `Get in touch with ${siteConfig.name} to discuss IoT, AI, web, and custom software projects. ${siteConfig.description}`

const { loading, sendContactMessage } = useContact()

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
      '@type': 'ContactPage',
      '@id': `${siteConfig.url}/contact#webpage`,
      'url': `${siteConfig.url}/contact`,
      'name': `Contact ${siteConfig.name}`,
      'description': `Get in touch with ${siteConfig.name} to discuss IoT, AI, web, and custom software projects.`,
      'potentialAction': {
        '@type': 'ScheduleAction',
        'target': siteConfig.calendly,
        'name': 'Schedule a Meeting'
      },
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
const contactForm = useTemplateRef('contactForm')
const turnstile = ref<{ reset: () => void } | null>(null)

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
    icon: 'i-line-md-email-multiple',
    href: `mailto:${siteConfig.email}`
  },
  {
    title: 'Chat with us',
    description: '+254 705 598 248',
    icon: 'i-line-md-chat-round-dots',
    href: 'https://wa.me/254705598248'
  },
  {
    title: 'Call us',
    description: '+254 705 598 248',
    icon: 'i-line-md-phone-call-loop',
    href: 'tel:+254705598248'
  },
  {
    title: 'Intro call',
    description: 'Start with a quick 30 minute intro call.',
    icon: 'i-line-md-calendar',
    href: siteConfig.calendly
  }
]

const state = reactive<Partial<Schema>>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: undefined,
  budget: undefined,
  message: '',
  token: ''
})

const controlUi = {
  base: 'w-full min-w-0 ps-11 pe-4 py-3 text-lg sm:text-lg sm:ps-12 sm:pe-5 sm:py-3.5 sm:text-base lg:ps-14 lg:pe-5 lg:py-4',
  leadingIcon: 'text-muted shrink-0',
  trailingIcon: 'text-muted shrink-0'
}

const selectUi = {
  ...controlUi,
  placeholder: 'text-default'
}

const textareaUi = {
  base: 'w-full min-w-0 text-base min-h-80 sm:min-h-48 sm:text-base lg:min-h-56',
  leadingIcon: 'text-muted shrink-0',
  trailingIcon: 'text-muted shrink-0'
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault()

  contactForm.value?.clear()

  try {
    await sendContactMessage(event.data)

    Object.keys(state).forEach((key) => {
      Reflect.set(
        state,
        key,
        key === 'subject' || key === 'budget' ? undefined : ''
      )
    })
    toast.add({
      title: 'Message sent',
      description:
        'Thank you for reaching out! Your message has been sent successfully.',
      icon: 'i-line-md-email-check-filled',
      color: 'success'
    })
    toast.add({
      title: 'Next steps',
      icon: 'i-line-md-text-box-multiple',
      description:
        'While you wait for our response, feel free to explore our blog for insights on IoT, AI, and software development.',
      color: 'primary',
      actions: [
        {
          label: 'Read our blog',
          to: '/blog',
          target: '_blank'
        }
      ]
    })
  } catch (error) {
    const validationErrors = extractValidationErrors(error)

    if (validationErrors.length > 0) {
      contactForm.value?.setErrors(validationErrors)
      toast.add({
        title: 'Check the highlighted fields',
        description: formatValidationErrorSummary(validationErrors),
        icon: 'i-lucide-alert-triangle',
        color: 'warning'
      })
      return
    }

    const errorMessage = extractErrorMessage(error)

    console.error('Failed to send contact message:', error)
    toast.add({
      title: 'Error',
      description: errorMessage,
      icon: 'i-line-md-close-circle-filled',
      color: 'error',
      actions: [
        {
          label: 'Email us',
          to: `mailto:${siteConfig.email}`,
          icon: 'i-line-md-email-multiple',
          target: '_blank'
        },
        {
          label: 'Chat with us',
          to: 'https://wa.me/254705598248',
          icon: 'i-line-md-chat-round-dots',
          target: '_blank'
        }
      ]
    })
  } finally {
    state.token = ''
    turnstile.value?.reset()
  }
}

function extractValidationErrors(error: unknown): ContactFieldError[] {
  const candidate = error as {
    data?: {
      errors?: ContactFieldError[]
      data?: {
        errors?: ContactFieldError[]
      }
    }
  }

  const errors = candidate.data?.errors ?? candidate.data?.data?.errors ?? []

  return Array.isArray(errors)
    ? errors.filter((entry): entry is ContactFieldError =>
        Boolean(entry?.name && entry?.message)
      )
    : []
}

function formatValidationErrorSummary(errors: ContactFieldError[]): string {
  return errors
    .map(({ name, message }) => `${formatFieldLabel(name)}: ${message}`)
    .join(' ')
}

function extractErrorMessage(error: unknown): string {
  const candidate = error as {
    data?: {
      message?: string
      data?: {
        message?: string
      }
    }
    message?: string
  }

  return (
    candidate.data?.message
    ?? candidate.data?.data?.message
    ?? candidate.message
    ?? 'Something went wrong while sending your message. Please try again later or contact us directly via email or phone.'
  )
}

function formatFieldLabel(name: string): string {
  return name
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
</script>

<template>
  <UContainer class="py-0 px-0">
    <UPageHero
      headline="Get in touch"
      title="Let's Build Something Amazing Together"
      description="Tell us what you are building, where you are stuck, or what you want to launch next. We work across IoT, AI, integrations, and custom software."
      :links="links"
      :ui="{
        headline:
          'uppercase tracking-[0.28em] text-xs font-semibold text-primary text-center',
        title:
          'max-w-3xl text-3xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-center mx-auto sm:block lg:text-4xl',
        description:
          'max-w-2xl text-sm text-muted text-center mx-auto sm:block sm:text-base',
        links: 'mt-6 justify-center sm:flex'
      }"
      class="hidden mx-auto sm:my-0 sm:block"
    />

    <div
      class="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-start"
    >
      <section class="space-y-6 lg:sticky lg:top-8">
        <div class="p-4">
          <p
            class="text-[14px] font-semibold uppercase tracking-[0.28em] text-primary mb-8"
          >
            Contact options
          </p>

          <div class="mt-5 space-y-4">
            <div
              v-for="detail in contactDetails"
              :key="detail.title"
              class="flex items-start gap-4 border-b border-default/60 transition-colors hover:border-primary/30"
            >
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary ring-1 ring-inset ring-primary/10"
              >
                <UIcon
                  :name="detail.icon"
                  class="h-5 w-5"
                />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-base font-medium text-default">
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
                  class="mt-1 block text-base text-muted transition-colors hover:text-primary"
                >
                  {{ detail.description }}
                </a>

                <p
                  v-else
                  class="mt-1 text-base text-muted"
                >
                  {{ detail.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="overflow-hidden rounded-4xl">
        <div class="border-b border-default/70 p-4 sm:p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p
                class="text-[14px] font-semibold uppercase tracking-[0.28em] text-primary"
              >
                Send a message
              </p>
              <h2
                class="mt-1 text-2xl font-semibold tracking-tight text-default sm:mt-2 sm:text-3xl"
              >
                Tell us about your project / inquiry
              </h2>
              <p
                class="mt-2 max-w-2xl text-sm leading-6 text-muted sm:mt-3 sm:text-base"
              >
                We'll use the details below to route your request to the right
                person and get back to you.
              </p>
            </div>
          </div>
        </div>

        <UForm
          ref="contactForm"
          class="p-4 sm:p-6"
          aria-label="Contact us form"
          :state="state"
          :schema="ContactSchema"
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
                    icon="i-line-md-account"
                    placeholder="John"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
                    class="w-full min-w-0"
                    :ui="controlUi"
                  />
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
                  />
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
                    icon="i-line-md-email"
                    type="email"
                    placeholder="john.doe@example.com"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
                    class="w-full min-w-0"
                    :ui="controlUi"
                  />
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
                    icon="i-line-md-phone"
                    type="tel"
                    placeholder="+1 555 123 4567"
                    color="neutral"
                    variant="soft"
                    size="lg"
                    :highlight="true"
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

              <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <UFormField
                  name="subject"
                  label="Subject"
                  required
                  class="w-full min-w-0"
                  :ui="{ label: 'text-xl sm:text-base' }"
                >
                  <USelectMenu
                    id="subject"
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
                    :ui="selectUi"
                  />
                </UFormField>

                <UFormField
                  name="budget"
                  label="Budget"
                  required
                  class="w-full min-w-0"
                  :ui="{ label: 'text-xl sm:text-base' }"
                >
                  <USelectMenu
                    id="budget"
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
                    :ui="selectUi"
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
            :ui="{ label: 'text-xl sm:text-base' }"
          >
            <UTextarea
              v-model="state.message"
              name="message"
              :rows="6"
              autoresize
              :maxrows="10"
              placeholder="Share a little about your project, timelines, product inquiry and what you need help with."
              color="neutral"
              variant="soft"
              size="lg"
              :highlight="true"
              class="w-full min-h-50 sm:min-h-48 lg:min-h-56"
              :ui="textareaUi"
            />
          </UFormField>

          <UFormField
            name="token"
            label="Verification"
            required
            class="mt-6 w-full"
            help="Please confirm you are human before sending your message."
            :ui="{ label: 'text-xl sm:text-base' }"
          >
            <NuxtTurnstile
              ref="turnstile"
              v-model="state.token"
            />
          </UFormField>

          <div
            class="mt-6 flex flex-col gap-4 border-t border-default/70 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <UButton
              type="submit"
              size="lg"
              :loading="loading"
              :trailing-icon="loading ? '' : 'i-lucide-send'"
              :ui="{
                base: 'w-full py-4 justify-center sm:w-auto text-lg sm:text-base md:text-sm',
                trailingIcon:
                  'transition-transform group-data-[state=open]:rotate-90'
              }"
              :label="loading ? 'Sending...' : 'Send Message'"
            />

            <p class="text-sm text-muted text-center sm:text-left">
              We typically reply within one business day.
            </p>
          </div>
        </UForm>
      </section>
    </div>
  </UContainer>
</template>
