"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FundCard from "@/components/FundCard";

function usdt(base: number | string): string {
  const n = typeof base === "string" ? parseInt(base) : base;
  return (n / 1_000_000).toFixed(2);
}

interface Milestone {
  id: string; budget: number; paidOut: number; description: string; status: string;
}
interface Audit {
  ts: string; decision: string; proposal: { amount: string; reason: string };
}

export default function Parent() {
  const [data, setData] = useState<{ milestones: Milestone[]; audit: Audit[]; kid: any } | null>(null);
  const [err, setErr] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [creating, setCreating] = useState(false);

  async function createMilestone() {
    if (!newDesc.trim() || !newBudget.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/milestones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newDesc, budgetUsdt: newBudget }),
      });
      const d = await res.json();
      if (d.ok) {
        setNewDesc(""); setNewBudget("");
        // refresh
        const r2 = await fetch("/api/dashboard");
        setData(await r2.json());
      } else { setErr(d.error); }
    } finally { setCreating(false); }
  }

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(d => d.error ? setErr(d.error) : setData(d)).catch(e => setErr(String(e)));
  }, []);

  const totalBudget = data?.milestones.reduce((a, m) => a + Number(m.budget), 0) ?? 0;
  const totalPaid = data?.milestones.reduce((a, m) => a + Number(m.paidOut), 0) ?? 0;

  return (
    <main className="min-h-screen bg-[#FFFDF5]">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-xl font-black">🦈 BabyShark</Link>
          <span className="rounded-full border-2 border-black bg-[#FFD23F] px-3 py-1 text-xs font-black">PARENT VIEW</span>
        </header>

        <h1 className="mt-6 text-4xl font-black">Dashboard</h1>

        {err && <p className="mt-4 rounded-xl border-2 border-red-500 bg-red-50 p-4 font-bold text-red-700">⚠️ {err} — is the dev server running from the repo root?</p>}

        {data && (
          <>
            {/* Stat cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[6px_6px_0_0_rgba(255,107,157,1)]">
                <p className="text-sm font-bold uppercase text-gray-500">Treasury funded</p>
                <p className="mt-1 text-3xl font-black">{usdt(totalBudget)} <span className="text-lg">USDT</span></p>
              </div>
              <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[6px_6px_0_0_rgba(62,193,211,1)]">
                <p className="text-sm font-bold uppercase text-gray-500">Paid to kid</p>
                <p className="mt-1 text-3xl font-black">{usdt(totalPaid)} <span className="text-lg">USDT</span></p>
              </div>
              <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[6px_6px_0_0_rgba(255,210,63,1)]">
                <p className="text-sm font-bold uppercase text-gray-500">Remaining</p>
                <p className="mt-1 text-3xl font-black">{usdt(totalBudget - totalPaid)} <span className="text-lg">USDT</span></p>
              </div>
            </div>

            {/* Create milestone */}
            <div className="mt-8 rounded-2xl border-2 border-black bg-[#F5F3FF] p-5 shadow-[5px_5px_0_0_rgba(179,136,255,1)]">
              <p className="font-black">➕ New milestone</p>
              <p className="mt-1 text-sm font-medium text-gray-600">
                Set a commitment for your kid. The agent can verify progress but can never create milestones — that&apos;s yours.
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="e.g. Candy Tycoon: full planning doc + money system"
                  className="flex-1 rounded-xl border-2 border-black px-4 py-2 font-medium outline-none focus:bg-white"
                />
                <input
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  placeholder="USDT (e.g. 10)"
                  className="w-full rounded-xl border-2 border-black px-4 py-2 font-mono outline-none focus:bg-white sm:w-40"
                />
                <button
                  onClick={createMilestone}
                  disabled={creating || !newDesc.trim() || !newBudget.trim()}
                  className="rounded-xl border-2 border-black bg-[#7AE582] px-5 py-2 font-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-40"
                >
                  {creating ? "…" : "Create"}
                </button>
              </div>
            </div>

            {/* Milestones */}
            <h2 className="mt-8 text-2xl font-black">Milestones</h2>
            <div className="mt-3 space-y-3">
              {data.milestones.map((m) => {
                const pct = Math.min(100, (Number(m.paidOut) / Number(m.budget)) * 100);
                return (
                  <div key={m.id} className="rounded-2xl border-2 border-black bg-white p-5 shadow-[5px_5px_0_0_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-between">
                      <p className="font-black">{m.description}</p>
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${m.status === "open" ? "bg-green-300" : "bg-gray-200"}`}>{m.status}</span>
                    </div>
                    <div className="mt-3 h-4 overflow-hidden rounded-full border-2 border-black bg-gray-100">
                      <div className="h-full bg-[#FFD23F]" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-2 text-sm font-bold text-gray-600">{usdt(m.paidOut)} / {usdt(m.budget)} USDT paid</p>
                  </div>
                );
              })}
            </div>

            {/* What BabyShark knows */}
            <h2 className="mt-8 text-2xl font-black">What BabyShark knows about your kid</h2>
            <div className="mt-3 rounded-2xl border-2 border-black bg-white p-5 shadow-[5px_5px_0_0_rgba(62,193,211,1)]">
              <pre className="whitespace-pre-wrap font-sans text-sm font-medium text-gray-700">
                {JSON.stringify(data.kid, null, 2)}
              </pre>
            </div>

            {/* Fund the project */}
            <div className="mt-8">
              <FundCard
                address={data.milestones[0]?.kidAddress ?? ""}
                kidName="Mateo"
              />
              <p className="mt-2 text-sm font-semibold text-gray-500">
                Note: QR points at the kid&apos;s project wallet for demo. Production flow:
                deposits land in a per-project escrow, released only via policy-approved payouts. See the public version: /fund
              </p>
              {/* Fiat on-ramp via WDK MoonPay module */}
              <div className="mt-4 rounded-2xl border-2 border-black bg-[#F5F3FF] p-4">
                <p className="font-black">💳 Add funds with a card</p>
                <p className="mt-1 font-medium text-gray-700">
                  Powered by WDK&apos;s MoonPay module: converts USD → USDT straight into
                  the treasury. One command in production:
                </p>
                <code className="mt-2 block overflow-x-auto rounded-lg bg-black p-2 font-mono text-xs text-green-300">
                  wdk buy --network sepolia --token usdt-test --fiat-amount 100 --wallet treasury
                </code>
                <a
                  href={`https://www.moonpay.com/buy`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  Open MoonPay on-ramp ↗
                </a>
              </div>
            </div>

            {/* Audit trail */}
            <h2 className="mt-8 text-2xl font-black">Payout decisions (audit trail)</h2>
            <div className="mt-3 space-y-2 pb-10">
              {data.audit.length === 0 && <p className="font-medium text-gray-500">No payout proposals yet.</p>}
              {data.audit.map((a, i) => (
                <div key={i} className="flex items-start justify-between gap-4 rounded-xl border-2 border-black bg-white p-4">
                  <div>
                    <p className="font-bold">{usdt(a.proposal.amount)} USDT — {a.proposal.reason}</p>
                    <p className="text-xs text-gray-500">{new Date(a.ts).toLocaleString()}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${
                    a.decision === "APPROVE" ? "bg-green-300" :
                    a.decision === "HOLD_FOR_PARENT" ? "bg-yellow-300" : "bg-red-300"
                  }`}>{a.decision.replace("_", " ")}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
