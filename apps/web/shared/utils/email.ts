import { isDisposableEmail } from 'fakeout'
import { z } from 'zod'

export const emailSchema = z
  .email({ message: 'Invalid email address.' })
  .refine(email => !isDisposableEmail(email), {
    message: 'Disposable email addresses are not allowed.'
  })
