import { FREE_AUDIT_LIMIT } from "@/lib/constants";
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

export function auditsRemaining(auditCount: number, subscribed: boolean) {
  if (subscribed) return null;
  return Math.max(0, FREE_AUDIT_LIMIT - auditCount);
}

export async function canRunAudit(email: string) {
  const user = await getOrCreateUser(email);
  const remaining = auditsRemaining(user.auditCount, user.subscribed);

  if (!user.subscribed && user.auditCount >= FREE_AUDIT_LIMIT) {
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

export async function markSubscribed(email: string) {
  const normalized = normalizeEmail(email);

  return prisma.user.upsert({
    where: { email: normalized },
    update: { subscribed: true },
    create: { email: normalized, subscribed: true },
  });
}
