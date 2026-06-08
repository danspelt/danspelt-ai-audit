"use client";

import { useState } from "react";

export default function AuditPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const response = await fetch("/api/audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ websiteUrl, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      setResult(data.error || "Something went wrong.");
    } else {
      setResult(data.audit);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Run an AI Website Audit</h1>

        <p className="mt-4 text-slate-300">
          Enter a business website and get a clear report showing what should be fixed first.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div>
            <label className="block text-sm font-medium">Website URL</label>
            <input
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@example.com"
              type="email"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-400 disabled:opacity-60"
          >
            {loading ? "Running audit..." : "Generate Audit"}
          </button>
        </form>

        {result && (
          <div className="mt-8 whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-100">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
