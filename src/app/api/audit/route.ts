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

    return Response.json({ audit });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to generate audit." },
      { status: 500 }
    );
  }
}
