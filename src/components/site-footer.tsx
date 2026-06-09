import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 glass">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-emerald-400">AuditSpark</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              AI-powered website audits that turn visitors into paying customers. 3 free audits, then $19/month.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-300">Product</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><Link href="/audit" className="transition-colors hover:text-emerald-400">Free Audit</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-emerald-400">Pricing</Link></li>
              <li><Link href="/#features" className="transition-colors hover:text-emerald-400">Features</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-300">Get Started</p>
            <p className="mt-4 text-sm text-slate-400">
              3 free audits included. Results in about 2 minutes.
            </p>
            <Link
              href="/audit"
              className="mt-4 inline-block text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Run your free audit →
            </Link>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} AuditSpark. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
