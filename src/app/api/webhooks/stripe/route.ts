import { fulfillStripeCheckout } from "@/lib/audits";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    return Response.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Webhook signature verification failed:", message);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const result = await fulfillStripeCheckout({
        id: session.id,
        mode: session.mode,
        customer_email: session.customer_email,
        metadata: session.metadata,
        payment_status: session.payment_status,
      });
      console.log("Webhook fulfill result:", result);
    } catch (err) {
      console.error("Webhook processing error:", err);
      return Response.json({ error: "Processing failed" }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}
