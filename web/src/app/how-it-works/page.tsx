"use client";

import { useState } from "react";
import Link from "next/link";

const CHECKER = "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px";

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl border-2 border-black bg-white shadow-[5px_5px_0_0_rgba(0,0,0,1)] open:bg-[#FFFBEF]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-black marker:hidden">
        {q}
        <span className="shrink-0 rounded-full border-2 border-black bg-[#FFD23F] px-2 py-0.5 text-sm font-black transition group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t-2 border-dashed border-gray-300 p-5 font-medium leading-relaxed text-gray-800">
        {children}
      </div>
    </details>
  );
}

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  void openFaq; void setOpenFaq;
  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-lg font-black">🛠️ How BabyShark works — under the hood</span>
          <Link href="/" className="rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold hover:bg-yellow-100">
            ← Home
          </Link>
        </header>

        <div className="mt-6 rounded-3xl border-4 border-black bg-black p-8 text-white shadow-[12px_12px_0_0_rgba(255,210,63,1)]">
          <p className="text-xs font-black uppercase tracking-widest text-[#FFD23F]">For judges &amp; skeptics</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            One rule holds the whole system together:
          </h1>
          <p className="mt-4 rounded-2xl border-2 border-[#FFD23F] bg-white/10 p-4 text-xl font-black sm:text-2xl">
            The AI decides who deserves the reward.
            <br />
            Deterministic code decides how much can move.
          </p>
        </div>

        {/* FAQ */}
        <h2 className="mt-14 text-center text-3xl font-black">Questions we get 🤔</h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-3 pb-4">
          <Faq q="Can someone prompt-inject the agent into draining the treasury?">
            They can convince it to say anything — but there is nothing for it to do. The LLM
            has no send tool and no keys. Its only money surface is a propose_payout() request
            that deterministic code checks against five hard rules (budget, recipient pinning,
            milestone state). Worst case: a rejected proposal in the audit log.
          </Faq>
          <Faq q="Who custodies the funds? Is a company holding them?">
            No. Both wallets are generated on the family&apos;s own machine by Tether&apos;s
            open-source WDK CLI — keys encrypted with a family passphrase, never leaving the
            device. No hosted balance to freeze or lose. Transfers are ordinary on-chain USDT
            transactions verifiable by anyone.
          </Faq>
          <Faq q="How does the AI actually verify the coding work?">
            GitHub is the evidence locker: every commit carries a timestamp, author, and diff.
            The agent reads commit history, per-file stats, and file contents via API. Stale
            repos expose &quot;I worked all week,&quot; and explanations are probed for real understanding.
          </Faq>
          <Faq q="What if something goes wrong? Can payouts be audited?">
            Every proposal → decision → transfer triple lands in an append-only audit file plus
            an on-chain receipt. Parents replay exactly why each payment happened; the dashboard
            renders this trail directly.
          </Faq>
          <Faq q="New wallets have no gas — doesn't that break payouts?">
            Great catch: receiving USDT is free, but sending normally requires the chain&apos;s
            native token. Designed for, in layers: card top-ups bundle a little native gas
            automatically (parents never see it); next, payouts switch to WDK&apos;s gasless
            ERC-4337 modules where fees are paid in USDT itself — wallets hold zero native gas,
            ever; and chain choice (Plasma/Stable) makes it structurally disappear. The upgrade
            touches one isolated file — not the agent or policy engine.
          </Faq>
          <Faq q="Does my kid need crypto experience?">
            No. The kid experiences it as: build things → chat with a coach → get paid. The
            wallet is created in one step during family setup; seed phrases are shown once and
            stored offline. Learning what&apos;s under the hood is optional — and a great lesson.
          </Faq>
          <Faq q="What about partial work?">
            Partial payouts are first-class. BabyShark proposes what the evidence supports —
            &quot;the jumping works great, that&apos;s 60% of the milestone&quot; — and the rest stays
            locked until it ships.
          </Faq>
          <Faq q="Is this real money or testnet?">
            The demo runs on Sepolia testnet with a MockUSDT token (identical ERC-20 behavior to
            real USDT). The code path to mainnet USDT is identical — flip the network config.
            We deliberately kept real money out of a weekend prototype.
          </Faq>
          <Faq q="Why USDT instead of dollars in a normal app?">
            Because the point is the kid owning value nobody can claw back — programmatically,
            across borders, without a bank account. That matters most exactly where this will be
            used most: LATAM families already live on USDT. Also: instant settlement means the
            reward lands while the win still feels good.
          </Faq>
        </div>

        <div className="mt-10 mb-4 flex flex-wrap justify-center gap-3">
          <Link href="/eli5" className="rounded-2xl border-2 border-black bg-white px-6 py-3 font-bold shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            ← Too technical? Picture-book version
          </Link>
          <Link href="/chat" className="rounded-2xl border-2 border-black bg-[#FFD23F] px-6 py-3 font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            Meet the Shark →
          </Link>
        </div>
      </div>
    </main>
  );
}
