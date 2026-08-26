import { FREE_AUDIT_LIMIT } from "@/lib/constants";

/** Total remaining requests for non-subscribers (free allotment + paid − used). */
export function auditsRemaining(
  auditCount: number,
  subscribed: boolean,
  paidCredits: number = 0
) {
  if (subscribed) return null;
  return Math.max(0, FREE_AUDIT_LIMIT + paidCredits - auditCount);
}
