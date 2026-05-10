import { z } from 'zod'
import { budgets, subjects } from '#shared/types'
import { emailSchema } from '#shared/utils'

export const ContactSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: emailSchema,
  phone: z.string().optional(),
  subject: z.enum(subjects, { message: 'Please select a valid subject.' }),
  budget: z.enum(budgets, { message: 'Please select a valid budget.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
  token: z
    .string()
    .min(1, { message: 'Please complete captcha verification.' })
})

export type ContactFormData = z.infer<typeof ContactSchema>
