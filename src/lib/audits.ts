import { CREDIT_PACK_SIZE, FREE_AUDIT_LIMIT } from "@/lib/constants";
import { auditsRemaining } from "@/lib/credit-math";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export { auditsRemaining } from "@/lib/credit-math";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getOrCreateUser(email: string) {
  const normalized = normalizeEmail(email);

  return prisma.user.upsert({
    where: { email: normalized },
    update: {},
    create: { email: normalized },
  });
}

export async function canRunAudit(email: string) {
  const user = await getOrCreateUser(email);
  const remaining = auditsRemaining(
    user.auditCount,
    user.subscribed,
    user.paidCredits
  );

  if (
    !user.subscribed &&
    user.auditCount >= FREE_AUDIT_LIMIT + user.paidCredits
  ) {
    return {
      allowed: false as const,
      remaining: 0,
      subscribed: false,
    };
  }

  return {
    allowed: true as const,
    remaining,
    subscribed: user.subscribed,
  };
}

export async function recordAudit(email: string) {
  const normalized = normalizeEmail(email);

  return prisma.user.update({
    where: { email: normalized },
    data: { auditCount: { increment: 1 } },
  });
}

export async function addCredits(email: string, amount: number = CREDIT_PACK_SIZE) {
  const normalized = normalizeEmail(email);

  return prisma.user.upsert({
    where: { email: normalized },
    update: { paidCredits: { increment: amount } },
    create: { email: normalized, paidCredits: amount },
  });
}

export async function markSubscribed(email: string) {
  const normalized = normalizeEmail(email);

  return prisma.user.upsert({
    where: { email: normalized },
    update: { subscribed: true },
    create: { email: normalized, subscribed: true },
  });
}

export async function getUser(email: string) {
  const normalized = normalizeEmail(email);

  return prisma.user.findUnique({
    where: { email: normalized },
  });
}

export async function canRunFollowUp(email: string) {
  const user = await getOrCreateUser(email);

  if (user.subscribed) {
    return {
      allowed: true as const,
      subscribed: true,
    };
  }

  const totalAvailable = FREE_AUDIT_LIMIT + user.paidCredits - user.auditCount;

  if (totalAvailable > 0) {
    return {
      allowed: true as const,
      subscribed: false,
    };
  }

  return {
    allowed: false as const,
    subscribed: false,
  };
}

export async function deductCredit(email: string) {
  const normalized = normalizeEmail(email);
  const user = await getUser(normalized);

  if (!user) throw new Error("User not found");

  if (user.paidCredits > 0) {
    return prisma.user.update({
      where: { email: normalized },
      data: { paidCredits: { decrement: 1 } },
    });
  }

  return prisma.user.update({
    where: { email: normalized },
    data: { auditCount: { increment: 1 } },
  });
}

type FulfillInput = {
  id: string;
  mode: string | null;
  customer_email: string | null;
  metadata?: { email?: string } | null;
  payment_status: string;
};

/**
 * Grant credits/subscription for a paid Checkout session at most once,
 * whether called from the webhook or the success redirect.
 */
export async function fulfillStripeCheckout(session: FulfillInput) {
  const email = session.customer_email || session.metadata?.email;

  if (!email || session.payment_status !== "paid") {
    return { fulfilled: false as const, reason: "unpaid_or_no_email" as const };
  }

  const normalized = normalizeEmail(email);
  const mode = session.mode ?? "unknown";

  try {
    await prisma.processedStripeSession.create({
      data: {
        id: session.id,
        email: normalized,
        mode,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { fulfilled: false as const, reason: "already_processed" as const };
    }
    throw error;
  }

  if (mode === "subscription") {
    await markSubscribed(email);
  } else if (mode === "payment") {
    await addCredits(email, CREDIT_PACK_SIZE);
  }

  return { fulfilled: true as const, email: normalized, mode };
}
