import { markSubscribed } from "@/lib/audits";
import Stripe from "stripe";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return Response.redirect(`${appUrl}/pricing?error=checkout`);
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const email = session.customer_email || session.metadata?.email;

    if (email && session.payment_status === "paid") {
      await markSubscribed(email);
    }

    return Response.redirect(`${appUrl}/audit?subscribed=1`);
  } catch (error) {
    console.error(error);
    return Response.redirect(`${appUrl}/pricing?error=checkout`);
  }
}
