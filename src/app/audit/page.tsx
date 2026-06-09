import { Suspense } from "react";
import AuditClient from "./audit-client";

export default function AuditPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center px-6 py-20">
          <p className="text-slate-400">Loading…</p>
        </main>
      }
    >
      <AuditClient />
    </Suspense>
  );
}
