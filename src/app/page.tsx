export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <p className="mb-4 rounded-full border border-blue-400/40 px-4 py-2 text-sm text-blue-200">
          AI Website Audit for Local Businesses
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Find out why your website is not getting enough leads.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Get a clear AI-powered website audit with quick fixes for your homepage,
          mobile layout, calls-to-action, SEO, and customer trust.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/audit"
            className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-400"
          >
            Start Website Audit
          </a>

          <a
            href="/pricing"
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white hover:bg-slate-900"
          >
            See Pricing
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Website Score</h2>
          <p className="mt-3 text-slate-300">
            Get a plain-English score that shows what is working and what is hurting conversions.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Quick Fixes</h2>
          <p className="mt-3 text-slate-300">
            See the top problems to fix first so the business can get more leads.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Better Copy</h2>
          <p className="mt-3 text-slate-300">
            Generate a stronger headline, CTA, and homepage message.
          </p>
        </div>
      </section>
    </main>
  );
}
