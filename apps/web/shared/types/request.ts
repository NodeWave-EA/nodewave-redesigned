import { z } from 'zod'
import { emailSchema } from '#shared/utils'

export const budgets = [
  'under 10k',
  '10k-50k',
  '50k-100k',
  '>100k',
  'Not sure yet',
  'Inquiry only'
] as const

export const subjects = [
  'General Inquiry',
  'Technical Support',
  'Partner Relations',
  'IoT Solutions',
  'Integration Inquiry',
  'Custom Software Development',
  'Web Development',
  'Other'
] as const

export const ContactRequestSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: emailSchema,
  phone: z.string().optional(),
  subject: z.enum(subjects),
  budget: z.enum(budgets),
  message: z.string().min(1, { message: 'Message is required.' }),
  token: z
    .string()
    .min(1, { message: 'Please complete captcha verification.' })
})

export type ContactRequest = z.output<typeof ContactRequestSchema>
