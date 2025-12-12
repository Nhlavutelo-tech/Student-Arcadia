Node backend for Student Arcadia contact form

Quick start

1. Copy `.env.example` to `.env` and fill SMTP values.
2. Install dependencies and run:

```bash
cd server-node
npm install
npm start
```

3. Run the static site from the project root (or serve it from the same host) and ensure the front-end form posts to `/api/contact`.

Environment variables
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` — SMTP credentials
- `TO_EMAIL` — recipient address (defaults to SMTP_USER)
- `FROM_EMAIL` — from address
- `PORT` — server port

Notes
- Use an app password for Gmail (if using Gmail) and enable 'Less secure' settings as necessary.
- The front-end will attempt to POST to `/api/contact` by fetch; if the backend isn't available the site will fallback to Formsubmit automatically.