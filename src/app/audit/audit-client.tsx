"use client";

import { FREE_AUDIT_LIMIT } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const LOADING_STEPS = [
  "Scanning your homepage structure…",
  "Analyzing conversion pathways…",
  "Checking mobile experience…",
  "Reviewing trust signals & SEO…",
  "Building your prioritized report…",
];

export default function AuditClient() {
  const searchParams = useSearchParams();
  const justSubscribed = searchParams.get("subscribed") === "1";

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);
  const [needsSubscription, setNeedsSubscription] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setIsError(false);
    setNeedsSubscription(false);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((s) => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
    }, 2200);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ websiteUrl, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setNeedsSubscription(!!data.needsSubscription);
        setResult(data.error || "Something went wrong.");
      } else {
        setResult(data.audit);
        setRemaining(data.remaining);
        setSubscribed(data.subscribed);
      }
    } catch {
      setIsError(true);
      setResult("Network error. Please try again.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  }

  async function handleSubscribe() {
    if (!email) {
      setIsError(true);
      setResult("Enter your email above, then subscribe.");
      return;
    }

    setCheckoutLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setIsError(true);
        setResult(data.error || "Could not start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setIsError(true);
      setResult("Could not start checkout. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  async function copyReport() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const hasSuccess = result && !isError;

  return (
    <main className="flex-1 px-6 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        {justSubscribed && (
          <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-300">
            You&apos;re subscribed! Unlimited audits are now active.
          </div>
        )}

        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {FREE_AUDIT_LIMIT} free audits · then $19/month
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Run Your <span className="text-gradient">Free Audit</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Enter your website and get a clear, prioritized report showing exactly what to fix first to win more clients.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-glow relative mt-10 overflow-hidden rounded-2xl glass-strong p-6 md:p-8"
          suppressHydrationWarning
        >
          {loading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 rounded-2xl bg-slate-950/90 backdrop-blur-sm">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20" />
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-400" style={{ animationDuration: "1s" }} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-white">Generating your audit…</p>
                <p className="mt-2 text-sm text-slate-400 transition-all duration-500">
                  {LOADING_STEPS[loadingStep]}
                </p>
              </div>
              <div className="flex gap-1.5">
                {LOADING_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i <= loadingStep ? "w-6 bg-emerald-400" : "w-1.5 bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-slate-300">
                Website URL
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <input
                  id="websiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourbusiness.com"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Business Email
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.com"
                  type="email"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                  suppressHydrationWarning
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glimmer-btn group relative w-full overflow-hidden rounded-xl bg-emerald-500 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 disabled:opacity-60"
              suppressHydrationWarning
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {loading ? "Running audit…" : "Generate My Free Audit"}
              </span>
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            {FREE_AUDIT_LIMIT} free audits per email · Then $19/month · Instant delivery
          </p>
        </form>

        {result && (
          <div className={`mt-8 animate-fade-up rounded-2xl border p-6 md:p-8 ${isError ? "border-red-500/30 bg-red-950/20" : "border-glow glass-strong"}`}>
            {isError ? (
              <div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20">
                    <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-red-300">Audit could not be generated</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{result}</p>
                  </div>
                </div>
                {needsSubscription && (
                  <button
                    onClick={handleSubscribe}
                    disabled={checkoutLoading}
                    className="glimmer-btn mt-6 w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {checkoutLoading ? "Redirecting…" : "Subscribe for $19/month"}
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                      <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Your Website Audit</p>
                      <p className="text-xs text-slate-500">{websiteUrl}</p>
                      {remaining !== null && (
                        <p className="mt-1 text-xs text-emerald-400">
                          {remaining} free audit{remaining === 1 ? "" : "s"} remaining
                        </p>
                      )}
                      {remaining === null && (
                        <p className="mt-1 text-xs text-emerald-400">Unlimited audits active</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={copyReport}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="report-content mt-6 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {result}
                </div>

                {/* Follow-up CTAs */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  {subscribed ? (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center">
                      <p className="text-sm font-medium text-emerald-300">
                        You have unlimited access — request as many follow-ups as you need!
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-4 text-center text-sm font-medium text-slate-400">
                        Want more help with your website?
                      </p>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          onClick={() => alert("One-time follow-up request - coming soon!")}
                          className="flex-1 rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-emerald-500/50 hover:bg-slate-800"
                        >
                          Request Follow-Up — $5
                        </button>
                        <button
                          onClick={handleSubscribe}
                          disabled={checkoutLoading}
                          className="glimmer-btn flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 disabled:opacity-60"
                        >
                          {checkoutLoading ? "Redirecting…" : "Get Membership — $19/month"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {hasSuccess && remaining === 0 && (
          <div className="mt-8 animate-fade-up rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center md:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">That was your last free audit</p>
            <h2 className="mt-2 text-xl font-bold">Keep auditing for $19/month</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Subscribe to run unlimited audits on any site, anytime.
            </p>
            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading}
              className="glimmer-btn mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 disabled:opacity-60"
            >
              {checkoutLoading ? "Redirecting…" : "Subscribe for $19/month"}
            </button>
          </div>
        )}

        {hasSuccess && remaining !== null && remaining > 0 && (
          <div className="mt-8 text-center text-sm text-slate-500">
            You have {remaining} free audit{remaining === 1 ? "" : "s"} left.{" "}
            <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300">
              See pricing →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
