import nodemailer from 'nodemailer'

export interface EmailProvider {
  send(options: EmailOptions): Promise<void>
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  amp?: string
}

class SmtpProvider implements EmailProvider {
  private transporter: nodemailer.Transporter

  constructor() {
    const host = process.env.NUXT_SMTP_HOST
    const port = process.env.NUXT_SMTP_PORT
      ? parseInt(process.env.NUXT_SMTP_PORT)
      : 587
    const user = process.env.NUXT_SMTP_USER
    const pass = process.env.NUXT_SMTP_PASS
    const fromEmail = process.env.NUXT_SMTP_FROM_EMAIL

    if (!host || !user || !pass || !fromEmail) {
      throw new Error(
        'SMTP configuration missing: NUXT_SMTP_HOST, NUXT_SMTP_USER, NUXT_SMTP_PASS, NUXT_SMTP_FROM_EMAIL are required'
      )
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass
      }
    })
  }

  async send(options: EmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.NUXT_SMTP_FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    })
  }
}

class GmailProvider implements EmailProvider {
  private transporter: nodemailer.Transporter

  constructor() {
    const user = process.env.NUXT_GMAIL_USER
    const appPassword = process.env.NUXT_GMAIL_APP_PASSWORD

    if (!user || !appPassword) {
      throw new Error(
        'Gmail configuration missing: NUXT_GMAIL_USER and NUXT_GMAIL_APP_PASSWORD are required'
      )
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass: appPassword
      }
    })
  }

  async send(options: EmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.NUXT_GMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    })
  }
}

class NodemailerProvider implements EmailProvider {
  private transporter: nodemailer.Transporter

  constructor() {
    const host = process.env.NUXT_NODEMAILER_HOST
    const port = process.env.NUXT_NODEMAILER_PORT
      ? parseInt(process.env.NUXT_NODEMAILER_PORT)
      : 587
    const user = process.env.NUXT_NODEMAILER_USER
    const pass = process.env.NUXT_NODEMAILER_PASS
    const fromEmail = process.env.NUXT_NODEMAILER_FROM_EMAIL

    if (!host || !user || !pass || !fromEmail) {
      throw new Error(
        'Nodemailer configuration missing: NUXT_NODEMAILER_HOST, NUXT_NODEMAILER_USER, NUXT_NODEMAILER_PASS, NUXT_NODEMAILER_FROM_EMAIL are required'
      )
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass
      }
    })
  }

  async send(options: EmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.NUXT_NODEMAILER_FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    })
  }
}

export function getEmailProvider(): EmailProvider {
  const provider = process.env.NUXT_SMTP_PROVIDER || 'nodemailer'

  switch (provider) {
    case 'smtp':
      return new SmtpProvider()
    case 'gmail':
      return new GmailProvider()
    case 'nodemailer':
      return new NodemailerProvider()
    default:
      throw new Error(`Unknown email provider: ${provider}`)
  }
}
