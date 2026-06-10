import { CREDIT_PACK_SIZE, FREE_AUDIT_LIMIT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

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

export function auditsRemaining(
  auditCount: number,
  subscribed: boolean,
  paidCredits: number = 0
) {
  if (subscribed) return null;
  return Math.max(0, FREE_AUDIT_LIMIT + paidCredits - auditCount);
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
