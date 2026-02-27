const nodemailer = require('nodemailer');

const isEmailConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

let transporter = null;
if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: parseInt(process.env.SMTP_PORT, 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
} else {
  console.warn('SMTP not configured — email notifications are disabled. Leads will still be saved to the database.');
}

async function sendNewLeadNotification({ name, email, phone_code, phone, company, message, leadId }) {
  if (!transporter) return;

  const phoneDisplay = phone ? `${phone_code || ''} ${phone}` : 'Not provided';
  const companyDisplay = company || 'Not provided';

  await transporter.sendMail({
    from: `"TBSBV Website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL || 'info@tbsbv.com',
    subject: `New Consultation Request (#${leadId}) — ${name}`,
    html: `
      <h2>New Lead from Website Contact Form</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name:</td><td style="padding:4px 12px;">${name}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email:</td><td style="padding:4px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Phone:</td><td style="padding:4px 12px;">${phoneDisplay}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Company:</td><td style="padding:4px 12px;">${companyDisplay}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Message:</td><td style="padding:4px 12px;">${message}</td></tr>
      </table>
    `,
  });
}

async function sendLeadConfirmation({ name, email }) {
  if (!transporter) return;

  await transporter.sendMail({
    from: `"TBSBV" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'We received your message — TBSBV',
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
        <h2 style="color:#0e7490;">Thank you, ${name}!</h2>
        <p style="font-size:15px;line-height:1.6;">
          We have received your consultation request and our team will review it shortly.
          You can expect a response within <strong>24 hours</strong>.
        </p>
        <p style="font-size:15px;line-height:1.6;">
          If your matter is urgent, feel free to reach us directly at
          <a href="mailto:info@tbsbv.com" style="color:#0e7490;">info@tbsbv.com</a>.
        </p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
        <p style="font-size:12px;color:#94a3b8;">
          TBSBV — Transparent Business Solutions<br/>
          Cybersecurity &bull; Investigations &bull; Due Diligence
        </p>
      </div>
    `,
  });
}

module.exports = { sendNewLeadNotification, sendLeadConfirmation };
