import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

function createTransport() {
  if (!config.smtp.host || !config.smtp.user) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });
}

function formatInquiryHtml(inquiry) {
  const rows = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone || '—'],
    ['Vehicle Model', inquiry.vehicleModel || '—'],
    ['Required Service', inquiry.service || '—'],
    ['Budget', inquiry.budget || '—'],
    ['Message', inquiry.message],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${label}</td><td style="padding:8px 12px;">${String(value).replace(/\n/g, '<br>')}</td></tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
  <body style="font-family:Inter,Arial,sans-serif;color:#1C2541;">
    <h2 style="margin:0 0 16px;">New Van Conversion Inquiry</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">${body}</table>
    <p style="margin-top:24px;font-size:12px;color:#6B7280;">Submitted at ${new Date(inquiry.createdAt ?? Date.now()).toISOString()}</p>
  </body>
</html>`;
}

export async function sendInquiryNotification(inquiry) {
  const transport = createTransport();
  const subject = `New inquiry from ${inquiry.name}`;
  const html = formatInquiryHtml(inquiry);

  if (!transport) {
    if (config.isProduction) {
      throw new Error('SMTP is not configured');
    }

    console.info('[mail] SMTP not configured — inquiry notification (dev only):');
    console.info({ to: config.adminEmail, subject, inquiry });
    return { delivered: false, mode: 'console' };
  }

  await transport.sendMail({
    from: config.smtp.from,
    to: config.adminEmail,
    replyTo: inquiry.email,
    subject,
    html,
    text: [
      `New inquiry from ${inquiry.name}`,
      '',
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone || '—'}`,
      `Vehicle: ${inquiry.vehicleModel || '—'}`,
      `Service: ${inquiry.service || '—'}`,
      `Budget: ${inquiry.budget || '—'}`,
      '',
      inquiry.message,
    ].join('\n'),
  });

  return { delivered: true, mode: 'smtp' };
}
