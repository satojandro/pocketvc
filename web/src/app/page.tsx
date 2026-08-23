import Image from "next/image";
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

export default function Landing() {
  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-6xl px-4 py-6">

        {/* ── Nav ── */}
        <nav className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-2xl font-black tracking-tight">BabyShark VC 🦈</span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link href="/eli5" className="rounded-xl border-2 border-black bg-white px-3 py-2 text-sm font-bold hover:bg-pink-100">
              ELI5 🖼️
            </Link>
            <Link href="/fund" className="rounded-xl border-2 border-black bg-[#7AE582] px-3 py-2 text-sm font-bold hover:bg-green-200">
              Back a kid 🌱
            </Link>
            <Link href="/parent" className="rounded-xl border-2 border-black bg-black px-3 py-2 text-sm font-bold text-white hover:bg-gray-800">
              Parent dashboard
            </Link>
            <Link href="/chat" className="rounded-xl border-2 border-black px-4 py-2 font-bold hover:bg-yellow-100">
              Kid login
            </Link>
          </div>
        </nav>

        {/* ── Chores → Commits ── */}
        <section className="mt-6 grid items-center gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-10 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">The new allowance</p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Chores are commits now.
            </h1>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                <span className="text-2xl">🗑️</span>
                <p className="font-bold text-gray-500 line-through decoration-red-400 decoration-2">Take out the trash — $5/week</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border-2 border-black bg-[#FFF9DB] p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <span className="text-2xl">💻</span>
                <p className="font-black">Ship 3 commits/week building games &amp; AI agents — $10 per verified milestone</p>
              </div>
            </div>
            <p className="mt-6 font-medium text-gray-700">
              Same deal your parents gave you. But the work builds a real skill,
              the money is USDT in the kid&apos;s own wallet, and an AI mentor
              makes sure it&apos;s actually earned.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/chat" className="rounded-2xl border-2 border-black bg-[#FF6B9D] px-6 py-3 text-lg font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                Start a session 🦈
              </Link>
              <a href="#how" className="rounded-2xl border-2 border-black bg-white px-6 py-3 text-lg font-bold shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                How it works
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border-4 border-black bg-[#CFFAEA] shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            <Image
              src="/shark-hero.png"
              alt="BabyShark mascot sitting on a pile of USDT coins"
              width={800}
              height={800}
              className="h-auto w-full"
              priority
            />
            <div className="absolute left-4 top-4 rotate-[-3deg] rounded-xl border-2 border-black bg-white px-3 py-2 text-sm font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              🔍 reviewed 14 commits today
            </div>
            <div className="absolute bottom-4 right-4 rotate-[2deg] rounded-xl border-2 border-black bg-white px-3 py-2 text-sm font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              💸 paid out <span className="bg-green-300 px-1">50.00 USDT</span>
            </div>
          </div>
        </section>

        {/* ── The problem ── */}
        <h2 className="mt-14 text-center text-3xl font-black">
          Why &quot;show me what you built&quot; never works
        </h2>
        <section className="mx-auto mt-6 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_rgba(255,107,157,1)]">
            <p className="text-4xl">😶</p>
            <h3 className="mt-3 text-2xl font-black">Kids have no one to show</h3>
            <p className="mt-3 font-medium text-gray-700">
              They&apos;re excited — but nobody around them understands what they
              built. Excitement with no audience dies in a week.
            </p>
          </div>
          <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_rgba(62,193,211,1)]">
            <p className="text-4xl">🤞</p>
            <h3 className="mt-3 text-2xl font-black">Parents can&apos;t verify anything</h3>
            <p className="mt-3 font-medium text-gray-700">
              Is the work real? Is it age-appropriate? Is my money buying
              progress or just getting spent? No way to know — so most parents
              never commit.
            </p>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="mt-14 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          <h2 className="text-center text-3xl font-black">BabyShark fixes both</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "👨‍👩‍👦", "Parent funds a milestone", "10 USDT per week of verified progress."],
              ["2", "💻", "Kid ships commits", "BabyShark reads every one and coaches daily."],
              ["3", "🦈", "Pitch time", "The Shark reviews the repo and asks curious questions."],
              ["4", "💸", "Policy-gated payout", "Verified work → USDT lands in the kid's own wallet."],
            ].map(([n, emoji, title, sub]) => (
              <div key={n} className="flex flex-col items-center rounded-2xl border-2 border-black bg-[#FFFDF5] p-5 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-[#FFD23F] text-xl font-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">{n}</div>
                <div className="mt-2 text-3xl">{emoji}</div>
                <p className="mt-2 font-black leading-tight">{title}</p>
                <p className="mt-1 text-sm font-medium text-gray-600">{sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-bold text-gray-700">
            Want it explained like you&apos;re five?{" "}
            <Link href="/eli5" className="underline decoration-[#FF6B9D] decoration-4 underline-offset-4 hover:text-[#FF6B9D]">
              Picture-book version →
            </Link>
          </p>
        </section>

        {/* ── Flywheel ── */}
        <section className="mt-14 rounded-3xl border-4 border-black bg-black p-8 text-white shadow-[12px_12px_0_0_rgba(122,229,130,1)] sm:p-12">
          <p className="text-center text-xs font-black uppercase tracking-widest text-[#7AE582]">
            Why it compounds
          </p>
          <h2 className="mt-2 text-center text-3xl font-black">The BabyShark flywheel 🔄</h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-0">
            {[
              ["💵", "Parents commit USDT to clear milestones", "#FFD23F"],
              ["💻", "The kid builds — with a coach who gets them", "#3EC1D3"],
              ["🔍", "The agent verifies real progress from the repo", "#7AE582"],
              ["😊", "Parents see receipts and trust grows", "#FF6B9D"],
              ["🌱", "Backers join in — funding bigger milestones", "#B388FF"],
              ["🔁", "…which funds bigger builds. Repeat.", "#FFD23F"],
            ].map(([e, t, c], i, arr) => (
              <div key={i}>
                <div className="flex items-center gap-4 rounded-2xl border-2 border-white/20 bg-white/5 p-4">
                  <span className="text-3xl">{e}</span>
                  <p className="font-bold" style={{ color: c }}>{t}</p>
                </div>
                {i < arr.length - 1 && (
                  <p className="py-1 pl-8 text-xl font-black text-[#7AE582]" aria-hidden>↓</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg font-medium text-gray-300">
            Every payout is proof of progress. Proof of progress attracts more funding.
            More funding buys more ambition.
          </p>
        </section>

        {/* ── Back a builder ── */}
        <section className="mt-14 grid items-center gap-6 md:grid-cols-2">
          <div className="rounded-3xl border-4 border-black overflow-hidden shadow-[12px_12px_0_0_rgba(122,229,130,1)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/shark-hero.png" alt="BabyShark mascot with a pile of USDT" className="h-auto w-full" />
          </div>
          <div className="rounded-3xl border-4 border-black bg-white p-10 shadow-[12px_12px_0_0_rgba(122,229,130,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-gray-500">Not just parents</p>
            <h2 className="mt-2 text-3xl font-black">Anyone can back a builder 🌱</h2>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Every kid gets a project page with their milestones, build log, and
              a QR code for their treasury. Grandparents, uncles, neighbors —
              anyone can scan and deposit USDT directly. Visible stake in a kid
              shipping — released only when the AI verifies the milestone.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/fund" className="rounded-2xl border-2 border-black bg-[#7AE582] px-6 py-3 font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                See Mateo&apos;s project page →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Safety band ── */}
        <section className="mt-14 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(255,107,157,1)] sm:p-12">
          <h2 className="text-3xl font-black">
            Parents stay in control. <span className="bg-[#3EC1D3] px-2 text-black">Always.</span>
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="font-black text-[#FF6B9D]">You set the budget</p>
              <p className="mt-2 font-medium text-gray-700">Fixed milestone amounts. The AI can never invent more.</p>
            </div>
            <div>
              <p className="font-black text-[#FF6B9D]">Code guards the money</p>
              <p className="mt-2 font-medium text-gray-700">
                A deterministic policy engine — not the AI — approves every payout.
                Big ones need your explicit OK.
              </p>
            </div>
            <div>
              <p className="font-black text-[#FF6B9D]">Your kid owns their wallet</p>
              <p className="mt-2 font-medium text-gray-700">
                Keys generated in your browser via Tether&apos;s WDK. Rewards go straight to them — no middleman.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-14 mb-4">
          <h2 className="mb-4 text-center text-3xl font-black">Questions we get 🤔</h2>
          <div className="mx-auto max-w-4xl space-y-3">
            <Faq q="Can someone prompt-inject the agent into draining the treasury?">
              They can convince it to say anything — but there is nothing for it to do. The LLM
              has no send tool and no keys. Its only money surface is a propose_payout() request
              that deterministic code checks against five hard rules. Worst case: a rejected
              proposal in the audit log.
            </Faq>
            <Faq q="Who custodies the funds? Is a company holding them?">
              No. Wallets are generated on the family&apos;s device — keys created in-browser
              during setup, encrypted locally. No hosted balance to freeze or lose. Transfers are
              ordinary on-chain USDT transactions verifiable by anyone.
            </Faq>
            <Faq q="How does the AI actually verify the coding work?">
              GitHub is the evidence locker: every commit carries a timestamp, author, and diff.
              The agent reads commit history, per-file stats, and file contents via API. Stale
              repos expose &quot;I worked all week.&quot;
            </Faq>
            <Faq q="Can payouts be audited?">
              Every proposal → decision → transfer lands in an append-only audit file plus an
              on-chain receipt. Parents replay exactly why each payment happened.
            </Faq>
            <Faq q="New wallets have no gas — doesn't that break payouts?">
              Designed for: card top-ups bundle native gas automatically; next, payouts switch to
              WDK&apos;s gasless ERC-4337 modules where fees settle in USDT itself — wallets hold
              zero native gas, ever.
            </Faq>
            <Faq q="Does my kid need crypto experience?">
              No. Build things → chat with a coach → get paid. Setup creates the wallets in one
              step; seed phrases are shown once and stored offline.
            </Faq>
            <Faq q="What about partial work?">
              Partial payouts are first-class: &quot;jumping works great, that&apos;s 60% of the
              milestone&quot; — the rest stays locked until it ships.
            </Faq>
            <Faq q="Real money or testnet?">
              Demo runs on Sepolia with MockUSDT (identical ERC-20 behavior). Mainnet USDT is the
              same code path with the network config flipped.
            </Faq>
            <Faq q="Why USDT and not dollars in an app?">
              The point is the kid owning value nobody can claw back — across borders, without a
              bank account. LATAM families already run on USDT, and instant settlement means the
              reward lands while the win still feels good.
            </Faq>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mb-4 rounded-3xl border-4 border-black bg-white p-10 text-center shadow-[12px_12px_0_0_rgba(62,193,211,1)]">
          <h2 className="text-4xl font-black">Ready to meet the Shark?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg font-medium text-gray-600">
            Fund a milestone tonight. Watch your kid show up tomorrow.
          </p>
          <Link href="/chat" className="mt-8 inline-block rounded-2xl border-2 border-black bg-[#FFD23F] px-10 py-4 text-xl font-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            Open BabyShark →
          </Link>
        </section>

        <footer className="pb-6 pt-2 text-center text-sm font-semibold text-black/70">
          Built at Aleph Hackathon 2026 · Tether WDK Track ·{" "}
          <a href="https://github.com/satojandro/pocketvc/tree/main/docs" target="_blank" rel="noreferrer" className="underline hover:text-black">
            Technical docs
          </a>
          {" "}· Self-custodial by design
        </footer>
      </div>
    </main>
  );
}
