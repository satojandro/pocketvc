"use client";

import { useState } from "react";
import Link from "next/link";
import { generateSeedPhrase, deriveAddress } from "@/lib/client-wallet";

/**
 * One-click family wallet setup — the account-creation flow.
 * KEYS ARE GENERATED IN THE BROWSER via the WDK SDK (@tetherto/wdk-wallet-evm).
 * Only public addresses are registered server-side. The server never sees
 * seed phrases or passphrases.
 */
export default function Setup() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [familyName, setFamilyName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [activity, setActivity] = useState("");
  const [wallets, setWallets] = useState<{ role: string; name: string; address: string }[]>([]);
  const [seeds, setSeeds] = useState<{ role: string; seed: string }[]>([]);

  async function createWallet(role: "treasury" | "kid") {
    // 1. generate keys IN THE BROWSER (never sent anywhere)
    const seedPhrase = generateSeedPhrase();
    // 2. derive the address locally using the WDK SDK
    const address = deriveAddress(seedPhrase);
    // 3. register ONLY the public address server-side
    const name = `${familyName.toLowerCase().replace(/[^a-z0-9]/g, "")}-${role}`;
    await fetch("/api/wallet/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address }),
    });
    setWallets((w) => [...w.filter((x) => x.role !== role), { role, name, address }]);
    setSeeds((s) => [...s, { role, seed: seedPhrase }]);
  }

  async function run() {
    setError("");
    setBusy(true);
    setStep(3);
    try {
      setActivity("Generating the parent treasury keys in your browser…");
      await createWallet("treasury");
      setActivity("Generating the kid's keys in your browser…");
      await createWallet("kid");
      setActivity("Creating the project pool (escrow)…");
      await createWallet("pool");
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
                We&apos;ll create two self-custodial wallets using Tether&apos;s WDK —
                a <b>treasury</b> you control, and a <b>wallet for your kid</b> that
                only they control.
              </p>
              <div className="mt-4 rounded-2xl border-2 border-black bg-[#F0FCF0] p-4 font-semibold">
                🔑 Your keys are generated <u>in your browser</u> and never leave this
                device. Our server only learns your public addresses — it couldn&apos;t
                move your money even if it wanted to.
              </div>
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
              <p className="mt-6 text-xl font-black">{activity}</p>
              <p className="mt-2 font-medium text-gray-500">
                Keys are being generated locally by the WDK SDK — nothing is sent to any server.
              </p>
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
                  These were generated in your browser and were never transmitted.
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
          Powered by @tetherto/wdk-wallet-evm · keys generated in-browser · self-custodial by design
        </p>
      </div>
    </main>
  );
}
