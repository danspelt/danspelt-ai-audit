import Link from "next/link";
import { GlimmerButton } from "./glimmer-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 glass-strong">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-emerald-400">
            AuditSpark
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#how-it-works" className="text-sm text-slate-400 transition-colors hover:text-white">
            How It Works
          </Link>
          <Link href="/#features" className="text-sm text-slate-400 transition-colors hover:text-white">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-slate-400 transition-colors hover:text-white">
            Pricing
          </Link>
        </nav>

        <GlimmerButton href="/audit" className="!px-5 !py-2.5 text-sm">
          Free Audit
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </GlimmerButton>
      </div>
    </header>
  );
}
