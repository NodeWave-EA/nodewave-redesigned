import type { ContactFieldError, ContactResponseSuccess } from '#shared/types'
import { ContactSchema } from '#shared/schemas'

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

  const turnstileValidation = await verifyTurnstileToken(token, event)

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
