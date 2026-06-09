"use client";

import { GlimmerButton } from "@/components/glimmer-button";
import { FREE_AUDIT_LIMIT } from "@/lib/constants";
import { useState } from "react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "to start",
    desc: `Get ${FREE_AUDIT_LIMIT} full AI website audits — no credit card required.`,
    features: [
      `${FREE_AUDIT_LIMIT} complete AI audits`,
      "Conversion analysis report",
      "Top 5 priority fixes",
      "Headline & CTA suggestions",
      "Mobile & SEO quick wins",
      "Plain-English results",
    ],
    cta: "Start Free Audit",
    href: "/audit",
    popular: false,
    action: "link" as const,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    desc: "Unlimited audits after your free ones run out.",
    features: [
      "Unlimited AI audits",
      "Everything in Free",
      "Audit any site, anytime",
      "Priority processing",
      "Cancel anytime",
    ],
    cta: "Subscribe for $19/month",
    popular: true,
    action: "checkout" as const,
  },
];

const FAQ = [
  {
    q: "How many free audits do I get?",
    a: `Every account gets ${FREE_AUDIT_LIMIT} free audits. After that, Pro is $19/month for unlimited audits.`,
  },
  {
    q: "How fast do I get results?",
    a: "AI audits are delivered in about 2 minutes.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "Not at all. Every report is written in plain English for business owners, not developers.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Pro is month-to-month with no long-term contract.",
  },
];

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    if (!email) {
      setError("Enter your email to subscribe.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || "Could not start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 px-6 py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400/80">Pricing</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            <span className="text-emerald-400">AuditSpark</span> Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            {FREE_AUDIT_LIMIT} free audits for everyone. $19/month when you need unlimited access.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-6 md:p-8 ${
                plan.popular
                  ? "border-glow bg-gradient-to-b from-emerald-950/60 to-slate-900/80 shadow-xl shadow-emerald-500/10"
                  : "border border-white/5 glass"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-emerald-500/30">
                  Best Value
                </div>
              )}

              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                <span className="text-sm text-slate-500">{plan.period}</span>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.action === "link" ? (
                <GlimmerButton href={plan.href!} variant={plan.popular ? "primary" : "secondary"} className="mt-8 w-full !px-5">
                  {plan.cta}
                </GlimmerButton>
              ) : (
                <div className="mt-8 space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourbusiness.com"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="glimmer-btn relative w-full overflow-hidden rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 disabled:opacity-60"
                  >
                    <span className="relative z-10">{loading ? "Redirecting…" : plan.cta}</span>
                  </button>
                  {error && <p className="text-center text-xs text-red-400">{error}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-xl border border-white/5 glass p-5">
                <p className="font-semibold">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400">Start with your {FREE_AUDIT_LIMIT} free audits today.</p>
          <GlimmerButton href="/audit" className="mt-4">
            Run Free Audit
          </GlimmerButton>
        </div>
      </div>
    </main>
  );
}
