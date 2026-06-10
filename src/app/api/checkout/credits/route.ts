import { normalizeEmail } from "@/lib/audits";
import {
  CREDIT_PACK_PRICE_CENTS,
  CREDIT_PACK_SIZE,
} from "@/lib/constants";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: "Stripe is not configured." }, { status: 500 });
    }

    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: normalizeEmail(email),
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `AuditSpark — ${CREDIT_PACK_SIZE} Audit Credits`,
              description: `${CREDIT_PACK_SIZE} additional AI website audits`,
            },
            unit_amount: CREDIT_PACK_PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/api/checkout/credits/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/audit`,
      metadata: {
        email: normalizeEmail(email),
        type: "credit_pack",
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Could not start checkout." }, { status: 500 });
  }
}
