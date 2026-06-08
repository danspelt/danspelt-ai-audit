# Deployment — AI Website Audit

**Subdomain:** `audit.danspelt.com`  
**GitHub repo:** `danspelt-ai-audit`

Do **not** serve this app to the public from home hardware. Use local machines for dev and demos only. See the full policy: [Hosting & Deployment](../danspelt.com/docs/hosting-and-deployment.md).

## Coolify (recommended)

1. Push `main` to GitHub (`danspelt-ai-audit`).
2. In Coolify: New Application → connect this repo → Next.js build.
3. Set production env vars from `.env.example` (`NEXT_PUBLIC_APP_URL=https://audit.danspelt.com`, live Stripe keys, database URL).
4. Domain: `audit.danspelt.com` — point Cloudflare DNS to your Hetzner VPS.
5. Register Stripe webhook: `https://audit.danspelt.com/api/webhooks/stripe` (adjust path if your app differs).

## Vercel (alternative)

1. Import `danspelt-ai-audit` in Vercel as a new project.
2. Add the same production environment variables.
3. Add custom domain `audit.danspelt.com` and update Cloudflare DNS per Vercel instructions.
4. Set Stripe live webhook URL to your Vercel production domain.
