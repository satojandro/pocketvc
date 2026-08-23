"use client";

import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

const CHECKER = "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px";

/* reuse flat line-art style */
function SharkIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M8 34c6-14 22-20 34-16 6 2 10 6 12 10l-8 2c-2 8-10 14-20 14-8 0-14-4-18-10z" stroke="#111" strokeWidth="2.5" fill="#9BC9E8" />
      <path d="M20 44c2 4 6 6 10 6M40 20l6-8 2 10" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="46" cy="30" r="3" fill="#111" />
      <path d="M50 36l8 4-8 4" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Fund() {
  const treasury = "0xC413707F12C1a08bFc8Dc6cD091bF69762B2b255";
  const ethUrl = `ethereum:${treasury}@11155111`;
  const goal = 200, raised = 50;
  const pct = Math.min(100, (raised / goal) * 100);

  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <Link href="/" className="text-lg font-black">🦈 BabyShark VC</Link>
          <span className="rounded-full border-2 border-black bg-[#FF6B9D] px-3 py-1 text-xs font-black text-white">PROJECT PAGE</span>
        </header>

        {/* Hero */}
        <div className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">Mateo, age 12 · Roblox dev</p>
              <h1 className="mt-1 text-3xl font-black leading-tight">My obby needs lava, checkpoints &amp; one more level 🌋</h1>
              <p className="mt-3 font-medium text-gray-700">
                I&apos;m building an obstacle game in Roblox. The checkpoints and lava
                work — next I&apos;m adding a shop where players buy power-ups.
                My AI mentor BabyShark checks my code every day.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/shark-hero.png" alt="" className="hidden h-24 w-24 shrink-0 rounded-full border-4 border-black object-cover sm:block" />
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-end justify-between">
              <p className="text-3xl font-black">{raised} <span className="text-lg">USDT</span></p>
              <p className="font-bold text-gray-500">raised of {goal} USDT</p>
            </div>
            <div className="mt-2 h-6 overflow-hidden rounded-full border-2 border-black bg-gray-100">
              <div className="h-full bg-gradient-to-r from-[#FFD23F] to-[#FF6B9D]" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 text-sm font-bold text-gray-600">
              {Math.round(pct)}% funded · milestone verified by BabyShark · paid on-chain
            </p>
          </div>

          {/* QR + back */}
          <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border-2 border-black bg-[#FFF9DB] p-5 sm:flex-row">
            <div className="rounded-xl border-4 border-black bg-white p-2">
              <QRCodeSVG value={ethUrl} size={130} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-black">Back Mateo&apos;s build 💛</p>
              <p className="mt-1 font-medium text-gray-700">
                Scan with any wallet to deposit USDT into the project treasury.
                Grandparents, uncles, neighbors — everyone can be an investor.
              </p>
              <p className="mt-2 break-all rounded-lg border border-gray-300 bg-white p-2 font-mono text-xs text-gray-600">
                {treasury}
              </p>
            </div>
          </div>
        </div>

        {/* How the AI verifies */}
        <div className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(62,193,211,1)]">
          <div className="flex items-center gap-3">
            <SharkIcon size={48} />
            <h2 className="text-2xl font-black">How does the AI verify progress?</h2>
          </div>
          <p className="mt-3 font-medium text-gray-700">
            Fair question — you&apos;re backing a kid you may never meet. Here&apos;s
            why your money can&apos;t be wasted:
          </p>
          <div className="mt-4 space-y-3">
            {[
              ["📖", "The repo is the receipt", "GitHub records every change with a timestamp. Backers see real commit history — not promises."],
              ["🦈", "An AI reviews every line", "BabyShark reads the diffs, asks the kid to explain their code, and only proposes payouts when evidence supports it."],
              ["🛡️", "Code — not the AI — releases funds", "A deterministic policy engine bounds payouts to verified milestones. The AI literally has no payment buttons."],
              ["📜", "Everything is public", "Payout decisions land on-chain with receipts in the audit trail. Your deposit is visible stake in a kid shipping."],
            ].map(([e, t, d]) => (
              <div key={t} className="flex items-start gap-3 rounded-2xl border-2 border-black bg-[#FFFBEF] p-4">
                <span className="text-2xl">{e}</span>
                <p className="font-medium"><b>{t}</b> — {d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone log */}
        <div className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(255,107,157,1)]">
          <h2 className="text-2xl font-black">Build log</h2>
          <div className="mt-4 space-y-3">
            {[
              ["✅", "Checkpoints shipped", "All 3 work. BabyShark verified + 50 USDT released.", "paid"],
              ["✅", "Lava speed slider", "Players adjust difficulty. Reviewed, approved.", "paid"],
              ["🔨", "Power-up shop (in progress)", "Buying speed boosts with in-game coins. Next pitch: Friday.", "upcoming"],
              ["🎯", "Level 2: the volcano", "Final milestone for this funding round.", "goal"],
            ].map(([icon, title, desc, status]) => (
              <div key={title as string} className="flex items-start justify-between gap-3 rounded-2xl border-2 border-black p-4"
                   style={{ background: status === "paid" ? "#F0FCF0" : status === "upcoming" ? "#FFF9DB" : "#F5F5F5" }}>
                <div>
                  <p className="font-black">{String(icon)} {String(title)}</p>
                  <p className="font-medium text-gray-700">{String(desc)}</p>
                </div>
                {status === "paid" && <span className="shrink-0 rounded-full border-2 border-black bg-green-300 px-2 py-0.5 text-xs font-black">PAID</span>}
              </div>
            ))}
          </div>
        </div>

        <footer className="py-6 text-center text-sm font-semibold text-black/60">
          Powered by BabyShark VC · Tether WDK · Self-custodial rewards
        </footer>
      </div>
    </main>
  );
}
