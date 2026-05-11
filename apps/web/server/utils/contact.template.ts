type ContactEmailTemplateParams = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
}

type ContactEmailTemplateResult = {
  html: string
  text: string
  amp: string
}

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://nodewave.net'

console.table({ SITE_URL })

const labelStyle
  = 'color:#5f6368;font-size:12px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;display:block;font-weight:600;'

const valueStyle
  = 'color:#202124;font-size:15px;line-height:1.6;margin-bottom:18px;'

export function createContactNotificationEmail({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message
}: ContactEmailTemplateParams): ContactEmailTemplateResult {
  const formattedMessage = message.replace(/\n/g, '<br />')

  const html = `
<div style="background:#f6f8fb;padding:40px 16px;font-family:Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:24px;border:1px solid #e5e7eb;overflow:hidden;">

    <!-- HEADER -->
    <div style="padding:32px;border-bottom:1px solid #eef2f7;text-align:center;">
      <img src="${SITE_URL}/preview.png" width="52" height="52" style="border-radius:12px;" />

      <h1 style="margin:14px 0 6px;font-size:26px;color:#202124;font-weight:600;">
        NodeWave
      </h1>

      <p style="margin:0;color:#5f6368;font-size:13px;">
        Intelligent systems & AI-powered infrastructure
      </p>
    </div>

    <!-- BODY -->
    <div style="padding:32px;">
      <h2 style="margin:0 0 8px;font-size:28px;color:#202124;font-weight:500;">
        New contact submission
      </h2>

      <p style="margin:0 0 24px;color:#5f6368;font-size:14px;line-height:1.7;">
        A new inquiry was submitted through the NodeWave website.
      </p>

      <!-- CARD -->
      <div style="background:#f8fafc;border-radius:18px;padding:24px;">

        <span style="${labelStyle}">Name</span>
        <div style="${valueStyle}">
          ${firstName} ${lastName}
        </div>

        <span style="${labelStyle}">Email</span>
        <div style="${valueStyle}">
          <a href="mailto:${email}" style="color:#1a73e8;text-decoration:none;">
            ${email}
          </a>
        </div>

        <span style="${labelStyle}">Phone</span>
        <div style="${valueStyle}">
          ${
            phone
              ? `<a href="tel:${phone}" style="color:#1a73e8;text-decoration:none;">
                  ${phone}
                </a>`
              : 'Not provided'
          }
        </div>

        <span style="${labelStyle}">Subject</span>
        <div style="${valueStyle}">
          ${subject}
        </div>
      </div>

      <!-- MESSAGE -->
      <div style="margin-top:20px;background:#f8fafc;border-radius:18px;padding:24px;">
        <span style="${labelStyle}">Message</span>

        <div style="color:#202124;font-size:15px;line-height:1.8;">
          ${formattedMessage}
        </div>
      </div>

      <!-- CTA -->
      <div style="margin-top:28px;text-align:center;">
        <a
          href="mailto:${email}"
          style="
            display:inline-block;
            background:#1a73e8;
            color:#fff;
            padding:12px 22px;
            border-radius:999px;
            text-decoration:none;
            font-size:14px;
            font-weight:600;
          "
        >
          Reply to ${firstName}
        </a>
      </div>

    </div>
  </div>
</div>
`

  const text = `
NODEWAVE — NEW CONTACT SUBMISSION

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

${SITE_URL}
`

  const amp = html // (keep AMP same for now unless you want AMP upgrade next)

  return { html, text, amp }
}
