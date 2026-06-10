import { addCredits, markSubscribed } from "@/lib/audits";
import { CREDIT_PACK_SIZE } from "@/lib/constants";
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
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_email || session.metadata?.email;
    const mode = session.mode;
    const paymentStatus = session.payment_status;

    if (!email || paymentStatus !== "paid") {
      console.log("Webhook: No email or payment not completed", { email, paymentStatus });
      return Response.json({ received: true });
    }

    try {
      if (mode === "subscription") {
        // Unlimited membership
        await markSubscribed(email);
        console.log("Webhook: Marked user as subscribed", email);
      } else if (mode === "payment") {
        // Credit pack
        await addCredits(email, CREDIT_PACK_SIZE);
        console.log("Webhook: Added credits to user", email);
      }
    } catch (err) {
      console.error("Webhook processing error:", err);
      return Response.json({ error: "Processing failed" }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}
