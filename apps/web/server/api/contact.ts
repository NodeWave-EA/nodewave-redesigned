import { resolveMx, lookup as dnsLookup } from 'node:dns/promises'
import type { ContactFieldError, ContactResponseSuccess } from '#shared/types'
import { ContactSchema } from '#shared/schemas'

type CachedMxResult = {
  value: boolean
  expiresAt: number
}

const MX_CACHE_TTL_MS = 10 * 60 * 1000
const NEGATIVE_MX_CACHE_TTL_MS = 60 * 1000
const mxCache = new Map<string, CachedMxResult>()
const pendingMxLookups = new Map<string, Promise<boolean>>()
const DNS_TIMEOUT_MS = 2000

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const validatedBody = ContactSchema.safeParse(body)

  if (!validatedBody.success) {
    const errors: ContactFieldError[] = validatedBody.error.issues.map(
      issue => ({
        name: issue.path.join('.'),
        message: issue.message
      })
    )

    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: {
        success: false,
        message: 'Please fix the highlighted fields and try again.',
        errors
      }
    })
  }

  const { firstName, lastName, email, phone, subject, message, token }
    = validatedBody.data

  const emailDomain = email.split('@').at(-1)?.trim().toLowerCase()
  const [turnstileValidation, hasMailExchange] = await Promise.all([
    verifyTurnstileToken(token, event),
    resolveMxRecords(emailDomain)
  ])

  if (!turnstileValidation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: {
        success: false,
        message: 'Captcha verification failed. Please try again.',
        errors: [
          {
            name: 'token',
            message: 'Captcha verification failed. Please try again.'
          }
        ]
      }
    })
  }

  if (!hasMailExchange) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: {
        success: false,
        message: 'Please use an email address that can receive mail.',
        errors: [
          {
            name: 'email',
            message: 'Please use an email address that can receive mail.'
          }
        ]
      }
    })
  }

  // Log the validated data
  console.table({ firstName, lastName, email, phone, subject, message })

  try {
    // Simulate sending logic
    console.log('Processing contact message from:', email)

    return {
      statusCode: 200,
      success: true,
      message:
        'Your message has been received. We will get back to you shortly.',
      data: {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message
      }
    } as ContactResponseSuccess
  } catch (err) {
    // createError for standard Nuxt error responses
    console.error('Error processing contact message:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: { success: false, message: 'Failed to send message' }
    })
  }
})

async function resolveMxRecords(domain: string | undefined): Promise<boolean> {
  if (!domain) return false

  // Check Cache
  const cachedResult = mxCache.get(domain)
  if (cachedResult && cachedResult.expiresAt > Date.now()) {
    return cachedResult.value
  }

  // Check Pending Lookups (Deduplication)
  const pendingLookup = pendingMxLookups.get(domain)
  if (pendingLookup) return pendingLookup

  // Define the Lookup logic
  const lookup = (async () => {
    try {
      // Race MX lookup against timeout
      const mxRecords = await Promise.race([
        resolveMx(domain),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), DNS_TIMEOUT_MS)
        )
      ])
      return mxRecords.length > 0
    } catch (err) {
      console.error(
        `Error occurred while resolving MX records for ${domain}:`,
        err
      )
      // Fallback: Check if domain has an A record (IP) if MX fails
      try {
        const aRecord = await dnsLookup(domain)
        return !!aRecord?.address
      } catch {
        return false // Domain is completely unreachable
      }
    }
  })()
    .then((value) => {
      // Manage Cache and Cleanup
      if (mxCache.size > 1000) mxCache.clear()
      mxCache.set(domain, {
        value,
        expiresAt:
          Date.now() + (value ? MX_CACHE_TTL_MS : NEGATIVE_MX_CACHE_TTL_MS)
      })
      return value
    })
    .finally(() => {
      pendingMxLookups.delete(domain)
    })

  pendingMxLookups.set(domain, lookup)
  return lookup
}
