# AuditSpark - Progress Notes
**Live Version - June 10, 2026**
**Status: Production Deployed & Running**

---

## ✅ What's Been Built

### Core Features Implemented

1. **AI Website Audit System**
   - OpenAI GPT-4.1-mini powered website analysis
   - Analyzes: Value proposition, headlines, CTAs, trust signals, mobile UX, navigation, forms
   - Returns actionable recommendations with specific examples

2. **Tiered Pricing Model**
   - **Free**: 3 audit requests per email
   - **Credit Packs**: $5 for 3 additional requests (stackable)
   - **Membership**: $19/month unlimited access

3. **Stripe Payment Integration**
   - Checkout sessions for credit packs (one-time payment)
   - Checkout sessions for subscriptions (recurring)
   - Webhook handler for reliable payment fulfillment
   - Success/cancel redirect handling

4. **Follow-up Chat Feature**
   - Chat interface appears after audit completion
   - Available to users with credits or membership
   - Each follow-up message consumes 1 credit
   - Real-time credit deduction
   - Maintains conversation context with previous audit

5. **Database Schema (Prisma)**
   ```prisma
   model User {
     id          String   @id @default(uuid())
     email       String   @unique
     auditCount  Int      @default(0)
     subscribed  Boolean  @default(false)
     paidCredits Int      @default(0)  // Credits from $5 packs
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
   }
   ```

---

## 🔧 Technical Architecture

### API Routes
- `POST /api/audit` - Generate website audit
- `POST /api/followup` - Send follow-up message (deducts credits)
- `POST /api/checkout` - Create subscription checkout
- `POST /api/checkout/credits` - Create credit pack checkout
- `GET /api/checkout/success` - Subscription success handler
- `GET /api/checkout/credits/success` - Credit pack success handler
- `POST /api/webhooks/stripe` - Stripe webhook for payments

### Key Files
- `src/lib/audits.ts` - User management, credit handling
- `src/lib/constants.ts` - Pricing constants
- `src/app/audit/audit-client.tsx` - Main UI component
- `prisma/schema.prisma` - Database schema

### Credit System Logic
```typescript
// Total available = free + paid - used
const totalAvailable = FREE_AUDIT_LIMIT + paidCredits - auditCount;

// Follow-up deduction (in deductCredit()):
// 1. If paidCredits > 0: decrement paidCredits
// 2. Else: increment auditCount (consume free audit)
```

---

## 🐛 Known Issues / Debugging In Progress

### Issue: Credit Count Display Wrong
**Status:** Debug logging added, awaiting verification

**Problem:** After user purchased 3 credits and used 1 follow-up, UI shows "5 requests remaining" instead of expected "4" or "2".

**Debug logging added to:**
- `src/app/api/followup/route.ts` - Logs before/after credit deduction

**Check logs at:**
- Coolify Dashboard → Application → Logs
- Or: `docker logs <container_id>`

**Expected behavior:**
- User starts: 3 free + 3 paid = 6 total
- After 1 audit: 2 free + 3 paid = 5 total
- After 1 follow-up: 2 free + 2 paid = 4 total

**Files to review if issue persists:**
- `src/lib/audits.ts` - `deductCredit()` function
- `src/app/api/followup/route.ts` - Credit deduction logic
- `src/app/audit/audit-client.tsx` - Credits display logic

---

## 📝 Text/UI Fixes Applied
- Removed "free" from all credit display text
- Now shows "X requests remaining" (generic, works for both free and paid)

---

## 🌐 Deployment Info

**URL:** https://audit.danspelt.com
**Hosting:** Coolify (Docker)
**Database:** PostgreSQL (Coolify managed)
**Framework:** Next.js 16.2.7

### Environment Variables (Coolify)
- `DATABASE_URL` - PostgreSQL connection
- `OPENAI_API_KEY` - OpenAI API
- `STRIPE_SECRET_KEY` - Stripe secret
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret (needs manual setup in Stripe Dashboard)
- `NEXT_PUBLIC_APP_URL` - https://audit.danspelt.com

---

## 🎯 Next Steps / TODO

### Immediate (if credit bug confirmed)
1. Review `deductCredit()` implementation
2. Check if email normalization causing mismatch
3. Verify database updates are persisting
4. Fix calculation if logic error found

### Stripe Webhook Setup (Manual - User needs to do this)
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://audit.danspelt.com/api/webhooks/stripe`
3. Select event: `checkout.session.completed`
4. Copy signing secret
5. Add to Coolify as `STRIPE_WEBHOOK_SECRET`

### Future Enhancements (if needed)
- Add user dashboard to view credit history
- Add admin panel to manage users
- Add analytics for conversion tracking
- Email notifications for low credits

---

## 🗄️ Database Commands
```bash
# Reset user credits (for testing)
npx prisma studio
# Or direct SQL via Coolify database panel
```

---

## 📞 Notes for Next AI

1. **Always check logs first** when debugging credit issues
2. **The webhook is already coded** - just needs Stripe Dashboard setup
3. **Email normalization** happens in `normalizeEmail()` - ensure consistency
4. **Credit packs are stackable** - users can buy multiple $5 packs
5. **Follow-ups consume credits** same as audits
6. **Production is live** - be careful with destructive changes

**If picking up credit bug:**
- Check Coolify logs for "[FollowUp]" debug messages
- Verify the deductCredit result matches expected values
- Check if UI is using `creditsRemaining` vs `remaining` from API response

**Key test scenario:**
1. New email → should have 3 requests
2. Buy $5 pack → should have 6 requests (3 free + 3 paid)
3. Use 1 audit → should have 5 requests
4. Use 1 follow-up → should have 4 requests (deducts 1 credit)

---

**Last Updated:** June 10, 2026 by Cascade AI
**Deployment Status:** Live & Running
**Next Review:** When credit count bug is resolved
