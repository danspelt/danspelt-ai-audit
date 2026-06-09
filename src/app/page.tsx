import { GlimmerButton } from "@/components/glimmer-button";
import { FREE_AUDIT_LIMIT } from "@/lib/constants";

const PROBLEMS = [
  { title: "Confusing Headlines", desc: "Visitors don't understand what you do in 3 seconds", icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" },
  { title: "Weak CTAs", desc: "No clear next step for interested customers", icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" },
  { title: "Mobile Issues", desc: "50%+ of traffic bounces on poor mobile UX", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { title: "Slow Loading", desc: "Every second delay costs 7% of conversions", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "No Trust Signals", desc: "Missing reviews, testimonials, credibility", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
  { title: "SEO Blindness", desc: "Invisible to Google for your best keywords", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
];

const FEATURES = [
  { title: "Conversion Score", desc: "Overall rating with category breakdown" },
  { title: "Priority Fixes", desc: "Top 5 issues ranked by revenue impact" },
  { title: "Better Headlines", desc: "AI-generated headlines that convert" },
  { title: "CTA Improvements", desc: "Stronger calls-to-action that drive action" },
  { title: "Mobile Audit", desc: "Specific mobile UX recommendations" },
  { title: "SEO Quick Wins", desc: "Low-effort, high-impact SEO fixes" },
];

function Icon({ path }: { path: string }) {
  return (
    <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 text-center md:pt-24">
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
          <span className="text-sm font-medium text-emerald-300">
            {FREE_AUDIT_LIMIT} free audits · then $19/month
          </span>
        </div>

        <h1 className="animate-fade-up mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl" style={{ animationDelay: "0.1s" }}>
          Your Website Is Losing You{" "}
          <span className="text-gradient">Money Every Day</span>
        </h1>

        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl" style={{ animationDelay: "0.2s" }}>
          68% of visitors leave within 5 seconds. Our AI audit shows you exactly
          why they&apos;re not becoming paying customers — and how to fix it.
        </p>

        <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "0.3s" }}>
          <GlimmerButton href="/audit">
            Get Free Website Audit
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </GlimmerButton>
          <GlimmerButton href="/pricing" variant="secondary">
            View Pricing
          </GlimmerButton>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          {FREE_AUDIT_LIMIT} free audits · Takes 2 minutes · No credit card to start
        </p>

        <div className="animate-fade-up mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "2 min", label: "Average audit time" },
            { value: "50+", label: "Checks performed" },
            { value: String(FREE_AUDIT_LIMIT), label: "Free audits included" },
          ].map((stat) => (
            <div key={stat.label} className="border-glow rounded-2xl glass p-5">
              <p className="text-2xl font-bold text-gradient md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-400 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 glass">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-6">
          {["AI-Powered Analysis", "Instant Results", "Actionable Fixes", "No Technical Jargon"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
              <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400/80">The problem</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Most Business Websites Have{" "}
            <span className="text-red-400">Critical Flaws</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.title}
              className="group rounded-2xl border border-red-500/10 bg-slate-900/50 p-6 transition-all duration-300 hover:border-red-500/30 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 transition-colors group-hover:bg-red-500/20">
                <Icon path={problem.icon} />
              </div>
              <h3 className="text-lg font-bold text-red-200">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{problem.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
        <div className="border-glow overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950/40 via-slate-900/60 to-slate-900/40 p-8 md:p-14">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400/80">How it works</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Your Complete Audit in 3 Steps
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Our AI analyzes your site like a senior conversion consultant — in minutes, not weeks.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Enter Your URL", desc: "Paste your website and business email. That's it." },
              { step: "02", title: "AI Deep Analysis", desc: "We review your site against 50+ conversion best practices." },
              { step: "03", title: "Get Your Report", desc: "Receive prioritized fixes ranked by revenue impact." },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-bold shadow-lg shadow-emerald-500/30">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <GlimmerButton href="/audit">Start Free Audit Now</GlimmerButton>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400/80">What you get</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Everything in Your Audit Report</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-6 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              <h3 className="font-bold text-emerald-300">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 animate-gradient opacity-90" />
          <div className="relative p-10 text-center md:p-16">
            <h2 className="text-3xl font-bold md:text-4xl">
              Stop Losing Customers to Competitors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Your website should be your best salesperson. Start with {FREE_AUDIT_LIMIT} free audits — upgrade to $19/month when you need more.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlimmerButton href="/audit">
                Get Free Audit
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </GlimmerButton>
              <GlimmerButton href="/pricing" variant="secondary">
                See Pricing
              </GlimmerButton>
            </div>
            <p className="mt-5 text-sm text-white/60">
              {FREE_AUDIT_LIMIT} free audits · No credit card to start · Results in 2 minutes
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
