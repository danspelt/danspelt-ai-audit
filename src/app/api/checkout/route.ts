import { normalizeEmail } from "@/lib/audits";
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
      mode: "subscription",
      customer_email: normalizeEmail(email),
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AuditSpark Pro",
              description: "Unlimited AI website audits",
            },
            unit_amount: 1900,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      metadata: {
        email: normalizeEmail(email),
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Could not start checkout." }, { status: 500 });
  }
}
