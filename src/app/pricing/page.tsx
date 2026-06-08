export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-4xl font-bold">Simple Pricing</h1>
        <p className="mt-4 text-center text-slate-300">
          Start with an audit. Upgrade when you want the fixes done for you.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Quick Audit</h2>
            <p className="mt-2 text-slate-300">AI website audit report.</p>
            <p className="mt-6 text-4xl font-bold">$19</p>
            <a href="/audit" className="mt-6 block rounded-xl bg-blue-500 px-5 py-3 text-center font-semibold">
              Start Audit
            </a>
          </div>

          <div className="rounded-2xl border border-blue-500 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Detailed Review</h2>
            <p className="mt-2 text-slate-300">Audit plus custom recommendations.</p>
            <p className="mt-6 text-4xl font-bold">$99</p>
            <a href="/audit" className="mt-6 block rounded-xl bg-blue-500 px-5 py-3 text-center font-semibold">
              Get Review
            </a>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Fix Package</h2>
            <p className="mt-2 text-slate-300">I fix the highest-impact website problems.</p>
            <p className="mt-6 text-4xl font-bold">$299+</p>
            <a href="/audit" className="mt-6 block rounded-xl bg-blue-500 px-5 py-3 text-center font-semibold">
              Request Fixes
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
