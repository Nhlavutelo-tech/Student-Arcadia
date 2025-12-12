require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res)=>{
  res.json({ ok: true, message: 'backend OK' });
});

app.post('/api/contact', async (req, res)=>{
  const data = req.body || {};
  const required = ['name', 'email', 'phone', 'message', 'userType'];
  for (const f of required) {
    if (!data[f]) return res.status(400).json({ ok:false, error: f + ' is required' });
  }

  const to = process.env.TO_EMAIL || process.env.SMTP_USER;
  if (!to) return res.status(500).json({ ok:false, error: 'TO_EMAIL not configured in environment' });

  // Prepare message
  const subject = process.env.EMAIL_SUBJECT_PREFIX ? `${process.env.EMAIL_SUBJECT_PREFIX} ${data.subject||''}` : (data.subject || 'New contact form message');
  const html = `
    <h2>New message from Student Arcadia</h2>
    <p><strong>Type:</strong> ${escapeHtml(data.userType)}</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject || '')}</p>
    <hr>
    <p>${escapeHtml(data.message).replace(/\n/g,'<br>')}</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      } : undefined
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: html
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('sendMail error', err);
    return res.status(500).json({ ok:false, error: 'Failed to send email', detail: err.message });
  }
});

function escapeHtml(str){
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

app.listen(PORT, ()=>console.log('Node server running on port', PORT));
