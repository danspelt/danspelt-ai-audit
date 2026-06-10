import { auditsRemaining, canRunAudit, recordAudit } from "@/lib/audits";
import {
  CREDIT_PACK_PRICE_LABEL,
  CREDIT_PACK_SIZE,
  FREE_AUDIT_LIMIT,
  PRO_PRICE_LABEL,
} from "@/lib/constants";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { websiteUrl, email } = await request.json();

    if (!websiteUrl || !email) {
      return Response.json(
        { error: "Website URL and email are required." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const access = await canRunAudit(email);

    if (!access.allowed) {
      return Response.json(
        {
          error: `You've used all ${FREE_AUDIT_LIMIT} free audits. Get ${CREDIT_PACK_SIZE} more for ${CREDIT_PACK_PRICE_LABEL}, or go unlimited for ${PRO_PRICE_LABEL}.`,
          needsSubscription: true,
          remaining: 0,
        },
        { status: 402 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are a senior website conversion consultant.

Review this website URL:
${websiteUrl}

The user email is:
${email}

Create a plain-English website audit for a small business owner.

Important:
- Do not pretend you visited the website if you cannot access it.
- Base the report on common small business website best practices.
- Make the advice practical and easy to understand.
- The goal is to help the business get more leads.

Return:

Website Audit for ${websiteUrl}

1. Overall first impression
2. Likely conversion problems
3. Top 5 things to fix first
4. Better homepage headline
5. Better call-to-action
6. SEO suggestions
7. Trust-building suggestions
8. Mobile improvement suggestions
9. Recommended next step

At the very end, add this exact message:
"If you'd like, I can help you create specific headlines, CTAs, or content tailored to your business! Use the buttons below to request a follow-up or get unlimited access. Just let me know."
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

    const audit = completion.choices[0]?.message?.content || "No audit generated.";

    const user = await recordAudit(email);
    const remaining = auditsRemaining(user.auditCount, user.subscribed, user.paidCredits);
    const creditsRemaining = user.paidCredits + Math.max(0, 3 - user.auditCount);

    return Response.json({
      audit,
      remaining,
      subscribed: user.subscribed,
      creditsRemaining: user.subscribed ? null : creditsRemaining,
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
      { error: message || "Failed to generate audit." },
      { status: apiError.status || 500 }
    );
  }
}
