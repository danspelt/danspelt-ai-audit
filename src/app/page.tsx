export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-emerald-300">
            247+ Websites Audited This Month
          </span>
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Your Website Is Losing You{' '}
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Money Every Day
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-slate-400">
          68% of visitors leave within 5 seconds. Our AI audit shows you exactly
          why they are not converting into paying customers.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/audit"
            className="group relative rounded-xl bg-blue-500 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Get Free Website Audit
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>

          <a
            href="/pricing"
            className="rounded-xl border border-slate-600 bg-slate-900/50 px-8 py-4 font-semibold text-white backdrop-blur transition-all hover:border-slate-500 hover:bg-slate-800"
          >
            View Pricing
          </a>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Takes 2 minutes • No credit card required
        </p>
      </section>

      {/* Trust Indicators */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6 py-8">
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">AI-Powered Analysis</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Instant Results</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Actionable Fixes</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Most Business Websites Have These{' '}
            <span className="text-red-400">Critical Problems</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Confusing Headlines', desc: 'Visitors do not understand what you do in 3 seconds', icon: '🎯' },
            { title: 'Weak CTAs', desc: 'No clear next step for interested customers', icon: '📢' },
            { title: 'Mobile Issues', desc: '50%+ of traffic bounces due to poor mobile experience', icon: '📱' },
            { title: 'Slow Loading', desc: 'Every second delay costs you 7% of conversions', icon: '⚡' },
            { title: 'No Trust Signals', desc: 'Missing reviews, testimonials, credibility markers', icon: '⭐' },
            { title: 'SEO Blindness', desc: 'Invisible to Google for your best keywords', icon: '🔍' },
          ].map((problem, i) => (
            <div key={i} className="rounded-2xl border border-red-500/20 bg-slate-900 p-6 transition-colors hover:border-red-500/40">
              <div className="mb-3 text-3xl">{problem.icon}</div>
              <h3 className="text-lg font-bold text-red-300">{problem.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{problem.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-950/50 to-slate-900 p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Get Your Complete Website Audit in 2 Minutes
            </h2>
            <p className="mt-4 text-slate-400">
              Our AI analyzes your site like a senior conversion consultant would
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'Enter Your URL', desc: 'Paste your website and business email' },
              { step: '2', title: 'AI Analysis', desc: 'Our AI reviews your site against 50+ best practices' },
              { step: '3', title: 'Get Your Report', desc: 'Receive actionable fixes prioritized by impact' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                  {item.step}
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/audit"
              className="inline-block rounded-xl bg-blue-500 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start Free Audit Now
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          What You Get
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Conversion Score', desc: 'Overall rating with breakdown by category', icon: '📊' },
            { title: 'Priority Fixes', desc: 'Top 5 issues ranked by impact on revenue', icon: '🎯' },
            { title: 'Better Headlines', desc: 'AI-generated headlines that actually convert', icon: '✍️' },
            { title: 'CTA Improvements', desc: 'Stronger calls-to-action that drive action', icon: '🎬' },
            { title: 'Mobile Audit', desc: 'Specific mobile UX recommendations', icon: '📱' },
            { title: 'SEO Quick Wins', desc: 'Low-effort, high-impact SEO fixes', icon: '🚀' },
          ].map((feature, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-900">
              <div className="mb-3 text-3xl">{feature.icon}</div>
              <h3 className="font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-600 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">
            Stop Losing Customers to Your Competitors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Your website should be your best salesperson. Fix it today and start
            converting more visitors into paying customers.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/audit"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-100"
            >
              Get Free Audit →
            </a>
            <a
              href="/pricing"
              className="rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
            >
              See Full Pricing
            </a>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Free audit • No credit card required • Results in 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-12">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-slate-500">
          <p>© 2025 AI Website Audit. Built for local businesses that want more leads.</p>
        </div>
      </footer>
    </main>
  );
}
