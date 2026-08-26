# Deployment — AI Website Audit

**Subdomain:** `audit.danspelt.com`  
**GitHub repo:** `danspelt-ai-audit`  
**Portfolio hub:** [danspelt.com](https://danspelt.com) (linked from product footer)

Do **not** serve this app to the public from home hardware. Use local machines for dev and demos only. Hosting policy: [danspelt.com hosting guide](https://github.com/danspelt/danspelt.com/blob/main/docs/hosting-and-deployment.md).

## Coolify (recommended)

1. Push `main` to GitHub (`danspelt-ai-audit`).
2. In Coolify: New Application → connect this repo → Next.js / Docker build.
3. Set production env vars from `.env.example`:
   - `NEXT_PUBLIC_APP_URL=https://audit.danspelt.com`
   - `DATABASE_URL`, live Stripe keys, `OPENAI_API_KEY`
   - After schema changes: `npx prisma db push` (or migrate) so `ProcessedStripeSession` exists
4. Domain: `audit.danspelt.com` — point Cloudflare DNS to your Hetzner VPS.
5. Stripe Dashboard → Webhooks → endpoint  
   `https://audit.danspelt.com/api/webhooks/stripe`  
   event: `checkout.session.completed`  
   copy signing secret → Coolify `STRIPE_WEBHOOK_SECRET`.

## Vercel (alternative)

1. Import `danspelt-ai-audit` in Vercel as a new project.
2. Add the same production environment variables.
3. Add custom domain `audit.danspelt.com` and update Cloudflare DNS per Vercel instructions.
4. Set Stripe live webhook URL to your Vercel production domain.
