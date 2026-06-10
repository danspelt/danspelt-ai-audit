import { canRunFollowUp, deductCredit, getUser } from "@/lib/audits";
import { FREE_AUDIT_LIMIT } from "@/lib/constants";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { websiteUrl, email, message, previousAudit } = await request.json();

    if (!websiteUrl || !email || !message) {
      return Response.json(
        { error: "Website URL, email, and message are required." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY is missing." },
        { status: 500 }
      );
    }

    // Check if user can do follow-up (has credits or membership)
    const access = await canRunFollowUp(email);
    const userBefore = await getUser(email);
    console.log("[FollowUp] Before deduction:", { email, paidCredits: userBefore?.paidCredits, auditCount: userBefore?.auditCount, subscribed: userBefore?.subscribed });

    if (!access.allowed) {
      return Response.json(
        {
          error: `You've used all your credits. Get ${FREE_AUDIT_LIMIT} more free audits with a new email, buy additional credits, or subscribe for unlimited access.`,
          needsPayment: true,
        },
        { status: 402 }
      );
    }

    // Deduct a credit if not subscribed (credit pack users)
    if (!access.subscribed) {
      console.log("[FollowUp] Deducting credit for:", email);
      const deductResult = await deductCredit(email);
      console.log("[FollowUp] Deduct result:", { email, paidCredits: deductResult.paidCredits, auditCount: deductResult.auditCount });
    } else {
      console.log("[FollowUp] User is subscribed, no credit deduction:", email);
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are a senior website conversion consultant having a follow-up conversation with a client.

Original website: ${websiteUrl}
Client email: ${email}

Previous audit context:
${previousAudit || "No previous audit provided."}

Client's follow-up question:
"${message}"

Provide a helpful, practical response that:
- Addresses their specific question directly
- References the original audit when relevant
- Offers actionable advice they can implement
- Keeps the tone professional but friendly
- Is concise but thorough (2-4 paragraphs max)

If the question is outside the scope of website optimization, politely redirect to website-related topics.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const response = completion.choices[0]?.message?.content || "No response generated.";

    // Get updated user to check remaining
    const updatedUser = await getUser(email);
    const creditsRemaining = updatedUser
      ? updatedUser.paidCredits + Math.max(0, FREE_AUDIT_LIMIT - updatedUser.auditCount)
      : 0;
    console.log("[FollowUp] After deduction:", { email, paidCredits: updatedUser?.paidCredits, auditCount: updatedUser?.auditCount, creditsRemaining });

    return Response.json({
      response,
      creditsRemaining: access.subscribed ? null : creditsRemaining,
      subscribed: access.subscribed,
    });
  } catch (error) {
    console.error(error);

    const apiError = error as {
      status?: number;
      code?: string;
      message?: string;
      error?: { message?: string; code?: string };
    };

    const code = apiError.code ?? apiError.error?.code;
    const message = apiError.message ?? apiError.error?.message;

    if (code === "insufficient_quota") {
      return Response.json(
        {
          error:
            "OpenAI API has no usable credits. Add prepaid credits at platform.openai.com → Settings → Billing → Overview → Add to credit balance, then create a new API key and update OPENAI_API_KEY.",
        },
        { status: 402 }
      );
    }

    return Response.json(
      { error: message || "Failed to generate response." },
      { status: apiError.status || 500 }
    );
  }
}
