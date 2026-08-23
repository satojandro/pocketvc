"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * One-click family wallet setup — the account-creation flow.
 * Creates treasury + kid wallets via WDK, shows addresses + seed phrase once.
 */
export default function Setup() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [familyName, setFamilyName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [wallets, setWallets] = useState<{ role: string; name: string; address: string }[]>([]);
  const [seeds, setSeeds] = useState<{ role: string; seed: string }[]>([]);
  const [activity, setActivity] = useState("");

  async function createWallet(role: "treasury" | "kid") {
    const name = `${familyName.toLowerCase().replace(/[^a-z0-9]/g, "")}-${role}`;
    const res = await fetch("/api/wallet/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    setWallets((w) => [...w.filter((x) => x.role !== role), { role, name, address: data.address }]);
    setSeeds((s) => [...s, { role, seed: data.seedPhrase }]);
    return data;
  }

  async function run() {
    setError("");
    setBusy(true);
    setStep(3);
    try {
      setActivity("Creating the parent treasury wallet…");
      await createWallet("treasury");
      setActivity("Creating the kid's wallet…");
      await createWallet("kid");
      setActivity("");
      setStep(4);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStep(2);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen" style={{ background: "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px" }}>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <Link href="/" className="text-lg font-black">🦈 BabyShark</Link>
          <span className="rounded-full border-2 border-black bg-[#FFD23F] px-3 py-1 text-xs font-black">FAMILY SETUP</span>
        </header>

        <div className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          {step === 1 && (
            <>
              <h1 className="text-3xl font-black">Set up your family 🏠</h1>
              <p className="mt-3 font-medium text-gray-700">
                We&apos;ll create two self-custodial wallets via Tether&apos;s WDK:
                a <b>treasury</b> you control, and a <b>wallet for your kid</b> that
                only they control. Keys are generated on this machine and never
                leave it.
              </p>
              <label className="mt-6 block text-sm font-black uppercase text-gray-500">Family name</label>
              <input
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="e.g. avellaneda"
                className="mt-2 w-full rounded-xl border-2 border-black px-4 py-3 font-mono outline-none focus:bg-yellow-50"
              />
              <button
                onClick={() => familyName.trim().length >= 3 && run()}
                disabled={familyName.trim().length < 3}
                className="mt-6 w-full rounded-2xl border-2 border-black bg-[#FFD23F] px-6 py-4 text-lg font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-40"
              >
                Create our wallets →
              </button>
            </>
          )}

          {step === 3 && (
            <div className="py-10 text-center">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-[#3EC1D3]" />
              <p className="mt-6 text-xl font-black">{activity || "Generating keys locally…"}</p>
              <p className="mt-2 font-medium text-gray-500">This takes about 30 seconds. Keys never leave your device.</p>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border-2 border-red-500 bg-red-50 p-4 font-bold text-red-700">⚠️ {error}</div>
          )}

          {step === 4 && (
            <>
              <p className="text-sm font-black uppercase tracking-widest text-green-600">✓ Done — welcome to BabyShark</p>
              <h1 className="mt-2 text-3xl font-black">Your family wallets</h1>
              <div className="mt-5 space-y-3">
                {wallets.map((w) => (
                  <div key={w.name} className="rounded-2xl border-2 border-black bg-[#FFFBEF] p-4">
                    <p className="font-black">{w.role === "treasury" ? "🏦 Treasury (parent)" : "🎒 Kid wallet"} — <span className="font-mono text-sm">{w.name}</span></p>
                    <p className="mt-1 break-all font-mono text-sm text-gray-700">{w.address}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border-2 border-red-500 bg-red-50 p-4">
                <p className="font-black text-red-700">🔑 Write these down NOW — shown only once</p>
                {seeds.map((s) => (
                  <details key={s.role} className="mt-2">
                    <summary className="cursor-pointer font-bold">{s.role} recovery phrase</summary>
                    <p className="mt-2 rounded-lg bg-white p-3 font-mono text-sm">{s.seed}</p>
                  </details>
                ))}
                <p className="mt-2 text-sm font-semibold text-red-600">
                  Anyone with these words controls the money. Store them offline.
                </p>
              </div>

              <Link
                href="/parent"
                className="mt-6 block w-full rounded-2xl border-2 border-black bg-[#FFD23F] px-6 py-4 text-center text-lg font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                Go to parent dashboard →
              </Link>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-sm font-semibold text-black/60">
          Powered by @tetherto/wdk-cli · keys generated &amp; stored on-device · self-custodial by design
        </p>
      </div>
    </main>
  );
}
