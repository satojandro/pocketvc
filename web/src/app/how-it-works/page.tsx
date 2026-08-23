import Link from "next/link";

const CHECKER = "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px";

/* ---------- palette ---------- */
const C = {
  pink: "#FF6B9D",
  yellow: "#FFD23F",
  teal: "#3EC1D3",
  green: "#7AE582",
  ink: "#111111",
};

function Node({
  color, emoji, kicker, title, points,
}: { color: string; emoji: string; kicker: string; title: string; points: string[] }) {
  return (
    <div
      className="relative flex-1 rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_var(--sc)] transition hover:-translate-y-1"
      style={{ ["--sc" as string]: color }}
    >
      <span
        className="absolute -top-5 left-5 rounded-full border-2 border-black px-3 py-0.5 text-xs font-black uppercase tracking-wide text-black"
        style={{ background: color }}
      >
        {kicker}
      </span>
      <p className="text-4xl">{emoji}</p>
      <h3 className="mt-2 text-xl font-black leading-tight">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm font-semibold text-gray-700">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full border border-black" style={{ background: color }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 py-2 md:py-0">
      <span className="rounded-full border-2 border-black bg-white px-2 py-0.5 text-[10px] font-black uppercase">
        {label}
      </span>
      <svg width="20" height="34" viewBox="0 0 20 34" className="my-1 md:rotate-90" aria-hidden>
        <line x1="10" y1="0" x2="10" y2="26" stroke={C.ink} strokeWidth="3" />
        <polygon points="4,24 16,24 10,34" fill={C.ink} />
      </svg>
    </div>
  );
}

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

export default function HowItWorks() {
  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* header */}
        <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-lg font-black">🛠️ How BabyShark works — under the hood</span>
          <Link href="/" className="rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold hover:bg-yellow-100">
            ← Home
          </Link>
        </header>

        {/* intro */}
        <div className="mt-6 rounded-3xl border-4 border-black bg-black p-8 text-white shadow-[12px_12px_0_0_rgba(255,210,63,1)]">
          <p className="text-xs font-black uppercase tracking-widest text-[#FFD23F]">For judges & skeptics</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            One rule holds the whole system together:
          </h1>
          <p className="mt-4 rounded-2xl border-2 border-[#FFD23F] bg-white/10 p-4 text-xl font-black sm:text-2xl">
            The AI decides who deserves the reward.
            <br />
            Deterministic code decides how much can move.
          </p>
          <p className="mt-4 font-medium text-gray-300">
            Everything below is that sentence, drawn out. Where money lives, what the AI can
            and can&apos;t do, how work gets verified — no hand-waving.
          </p>
        </div>

        {/* THE FLOW */}
        <h2 className="mt-10 text-center text-3xl font-black">The journey of one payout 💸</h2>
        <p className="mt-1 text-center font-semibold text-black/60">Follow 50 USDT from promise to pocket</p>

        <div className="mt-8 flex flex-col md:flex-row md:items-stretch">
          <Node
            color={C.pink}
            emoji="👨‍👩‍👦"
            kicker="Step 1 · Parent"
            title="Fund the milestone"
            points={[
              "Sets the rule up front: “100 USDT for an obby with 3 working checkpoints”",
              "Money sits in the parent’s own self-custodial treasury wallet",
              "Nothing moves until the work is verified",
            ]}
          />
          <Arrow label="commits funds" />
          <Node
            color={C.yellow}
            emoji="💻"
            kicker="Step 2 · Kid"
            title="Build & check in daily"
            points={[
              "Every save is a GitHub commit — a tamper-proof diary of the work",
              "BabyShark coaches between sessions: remembers struggles, cheers wins",
              "Kid can’t fake progress — the repo tells the truth",
            ]}
          />
          <Arrow label="“I’m done!”" />
          <Node
            color={C.teal}
            emoji="🦈"
            kicker="Step 3 · Agent"
            title="BabyShark investigates"
            points={[
              "Reads commits via GitHub API: when, how much, which files",
              "Opens files and asks the kid to explain their code",
              "Renders a verdict — then fills out a payout PROPOSAL (a permission slip)",
            ]}
          />
        </div>
        <Arrow label="propose_payout() — the only gateway" />

        {/* policy engine — the hero card */}
        <div className="rounded-3xl border-4 border-black bg-[#111111] p-8 text-white shadow-[12px_12px_0_0_rgba(122,229,130,1)]">
          <span className="rounded-full border-2 border-[#7AE582] px-3 py-0.5 text-xs font-black uppercase tracking-wide text-[#7AE582]">
            Step 4 · Policy Engine — no AI allowed
          </span>
          <h3 className="mt-3 text-2xl font-black">🛡️ The robot accountant</h3>
          <p className="mt-2 max-w-3xl font-medium text-gray-300">
            A plain-TypeScript gate with unit tests. It doesn&apos;t read the pitch. It
            doesn&apos;t care how charming the kid is. It checks five things, mechanically:
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["≤ budget left?", "Payout can never exceed the milestone’s remaining balance"],
              ["✅ milestone open?", "Paid or cancelled milestones reject automatically"],
              ["📍 right recipient?", "Hard-pinned to the kid wallet on the contract"],
              ["🚫 not the treasury?", "The treasury itself is blacklisted as a destination"],
              ["👨‍👩‍👦 above threshold?", "Big payouts pause for explicit parent approval"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border-2 border-[#7AE582]/60 bg-white/5 p-4">
                <p className="font-black text-[#7AE582]">{t}</p>
                <p className="mt-1 text-sm font-medium text-gray-300">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-sm text-gray-400">
            outcome → APPROVE ▸ execute · HOLD_FOR_PARENT ▸ wait for human · REJECT ▸ log why
          </p>
        </div>
        <Arrow label="APPROVE only" />

        <div className="flex flex-col md:flex-row md:items-stretch">
          <Node
            color={C.green}
            emoji="💳"
            kicker="Step 5 · Wallet layer"
            title="WDK executes the transfer"
            points={[
              "@tetherto/wdk-cli signs locally in its passphrase-gated daemon",
              "USDT moves on-chain — verifiable by anyone on a block explorer",
              "--json receipts land in the audit log next to the verdict",
            ]}
          />
          <Arrow label="lands in" />
          <Node
            color="#B388FF"
            emoji="🎉"
            kicker="Step 6 · Kid"
            title="His money, actually his"
            points={[
              "Self-custodial wallet generated on the family’s machine",
              "Keys never touched a server — not even ours",
              "Not your keys, not your coins… so we gave the kid the keys",
            ]}
          />
        </div>

        {/* SAFETY DEEP DIVE */}
        <h2 className="mt-14 text-center text-3xl font-black">🔒 The security model, plainly</h2>
        <p className="mt-1 text-center font-semibold text-black/60">
          The questions any serious person should ask about an AI holding money
        </p>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_rgba(255,107,157,1)]">
            <p className="text-3xl">🎭</p>
            <h3 className="mt-2 text-lg font-black">&quot;Can someone prompt-inject the agent into draining the treasury?&quot;</h3>
            <p className="mt-2 font-medium text-gray-700">
              They can convince it to <em>say</em> anything — but there&apos;s nothing for it to
              <em> do</em>. The LLM has no send tool, no keys, no wallet access. Its only move is
              filing a proposal that a program checks against five hard rules. Worst case:
              a rejected proposal in the audit log.
            </p>
          </div>
          <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_rgba(62,193,211,1)]">
            <p className="text-3xl">🏦</p>
            <h3 className="mt-2 text-lg font-black">&quot;Who custodies the funds? Is there a company holding them?&quot;</h3>
            <p className="mt-2 font-medium text-gray-700">
              No. Both wallets are generated on-device by Tether&apos;s open-source WDK CLI.
              Keys are encrypted with a family passphrase and never leave the machine. There&apos;s
              no hosted balance to freeze, hack, or lose — transfers are ordinary on-chain USDT
              transactions anyone can verify.
            </p>
          </div>
          <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_rgba(255,210,63,1)]">
            <p className="text-3xl">🕵️</p>
            <h3 className="mt-2 text-lg font-black">&quot;How does it actually verify coding work?&quot;</h3>
            <p className="mt-2 font-medium text-gray-700">
              GitHub is the evidence locker: every commit has a timestamp, an author, and a diff.
              The agent reads commit history, per-file stats, and file contents via API — stale
              repos expose &quot;I worked all week,&quot; and explanations are probed for understanding,
              not memorized answers.
            </p>
          </div>
          <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_rgba(122,229,130,1)]">
            <p className="text-3xl">📜</p>
            <h3 className="mt-2 text-lg font-black">&quot;What if a payout goes wrong? Can we audit it?&quot;</h3>
            <p className="mt-2 font-medium text-gray-700">
              Every proposal → decision → transfer triple lands in an append-only audit file,
              plus an on-chain receipt. Parents replay exactly why each payment happened — the
              dashboard renders this trail directly.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="mt-14 text-center text-3xl font-black">More questions we get 🤔</h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-3 pb-4">
          <Faq q="Does my kid need crypto experience?">
            No. The kid experiences it as: build things → chat with a coach → get paid. The
            wallet is created for them in one step; they never handle seed phrases during normal
            use. Learning what&apos;s under the hood is optional — and honestly, a great lesson.
          </Faq>
          <Faq q="What if the kid does great partial work?">
            Partial payouts are first-class. BabyShark proposes what the evidence supports —
            &quot;jumping works great, that&apos;s 60% of the milestone&quot; — and the rest stays
            locked until the remainder ships. Feedback names what was excellent before anything else.
          </Faq>
          <Faq q="What stops the agent from judging unfairly?">
            Three layers: the persona is constrained to evidence-first verdicts, every verdict must
            cite repo evidence (which parents can check), and the policy engine bounds whatever the
            judge decides. And the parent sees the full trail — unfair judgments are visible, and
            funding is always theirs to stop.
          </Faq>
          <Faq q="Is real money involved tonight, or just testnet?">
            The demo runs on Sepolia testnet with a MockUSDT token (same ERC-20 behavior as real
            USDT). The code path to mainnet USDT is identical — flip the network config and fund
            with real USDT. We deliberately kept real money out of a weekend prototype.
          </Faq>
          <Faq q="Why USDT instead of just dollars in an app?">
            Because the point is the kid owning value nobody can claw back — programmatically,
            across borders, without a bank account. That matters most exactly where this will be
            used most: LATAM families already live on USDT. Also: instant settlement means the
            reward lands while the win still feels good.
          </Faq>
          <Faq q="What's the tech stack?">
            Next.js + Vercel AI SDK (agent loop), TypeScript policy engine with vitest coverage,
            Tether WDK CLI for wallets/transfers, OpenZeppelin for the demo token, Foundry for
            deployment, GitHub REST API for verification. Full diagrams in the repo&apos;s docs/.
          </Faq>
        </div>

        {/* CTA */}
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
