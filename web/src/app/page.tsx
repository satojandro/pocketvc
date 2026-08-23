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
        {/* Nav */}
        <nav className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-2xl font-black tracking-tight">BabyShark VC 🦈</span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link href="/eli5" className="rounded-xl border-2 border-black bg-white px-3 py-2 text-sm font-bold hover:bg-pink-100">
              ELI5 🖼️
            </Link>
            <Link href="/fund" className="rounded-xl border-2 border-black bg-[#7AE582] px-4 py-2 font-bold hover:bg-green-200">
              Back a kid 🌱
            </Link>
            <Link href="/parent" className="rounded-xl border-2 border-black bg-black px-4 py-2 font-bold text-white hover:bg-gray-800">
              Parent dashboard
            </Link>
            <Link href="/chat" className="rounded-xl border-2 border-black px-4 py-2 font-bold hover:bg-yellow-100">
              Kid login
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="mt-6 grid items-center gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-10 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Your kid builds.<br />
              The Shark reviews.<br />
              <span className="bg-yellow-300 px-2">Real money moves.</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-700">
              BabyShark is an AI mentor who actually reads your kid&apos;s code,
              coaches them every day, and pays out real USDT when they hit
              milestones <em>you</em> funded.
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
            {/* floating cards */}
            <div className="absolute left-4 top-4 rotate-[-3deg] rounded-xl border-2 border-black bg-white px-3 py-2 text-sm font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              🔍 reviewed 14 commits today
            </div>
            <div className="absolute bottom-4 right-4 rotate-[2deg] rounded-xl border-2 border-black bg-white px-3 py-2 text-sm font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              💸 paid out <span className="bg-green-300 px-1">50.00 USDT</span>
            </div>
          </div>
        </section>

        {/* Mateo's story — the pitch, in one band */}
        <section className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-widest text-[#FF6B9D]">Why we built this</p>
          <h2 className="mt-2 text-3xl font-black">Mateo&apos;s summer 🛹🎮</h2>
          <p className="mt-4 max-w-3xl text-lg font-medium text-gray-800">
            Mateo is 12. This summer he wanted to build a Roblox game. His dad
            wanted to encourage him — but Dad can&apos;t read code, so he couldn&apos;t
            tell if Mateo was making progress or just playing. Meanwhile Mateo was
            earning $5 taking out the trash: money for work that teaches him nothing,
            paid whenever Dad remembers.
          </p>
          <p className="mt-4 max-w-3xl text-lg font-medium text-gray-800">
            BabyShark closes the loop: <b>Dad commits USDT to a clear milestone</b>,
            <b> an AI mentor reviews the real code and coaches Mateo daily</b>, and
            when the work checks out, <b>the money lands in Mateo&apos;s own wallet</b> —
            instantly, with receipts. And anyone else who believes in Mateo can back
            his project too.
          </p>
        </section>

        {/* Problem / opportunity / shark / treasure — alternating rows */}
        <section id="how" className="mt-6 space-y-6">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_rgba(255,107,157,1)]">
              <div className="text-4xl">😕</div>
              <h2 className="mt-4 text-2xl font-black">The problem: two gaps</h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border-2 border-black bg-[#FFE5EE] p-4">
                  <p className="font-black">😶 The visibility gap</p>
                  <p className="mt-2 font-medium text-gray-700">
                    Dad can&apos;t read the code, so &quot;show me what you built&quot;
                    dies in week one — and &quot;yeah dad, I worked on it&quot; goes undetected.
                  </p>
                </div>
                <div className="rounded-2xl border-2 border-black bg-[#E5F6FF] p-4">
                  <p className="font-black">🤞 The funding trust gap</p>
                  <p className="mt-2 font-medium text-gray-700">
                    Even when family wants to fund a kid&apos;s project, money goes
                    on faith — no way to verify what actually got delivered.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border-4 border-black bg-[#FFF9DB] p-8 shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">The opportunity</p>
              <h3 className="mt-2 text-2xl font-black">Chores taught responsibility.<br />Building teaches more.</h3>
              <p className="mt-3 font-medium text-gray-700">
                Kids already earn money for mundane tasks. What if the same deal —
                clear commitment, verified delivery, real payout — applied to
                <b> learning to code</b>? The skills compound; the allowance doesn&apos;t.
                LATAM families already run on USDT, so the reward is money that
                actually means something.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="rounded-3xl border-4 border-black overflow-hidden shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shark-hero.png" alt="BabyShark mascot" className="h-auto w-full" />
            </div>
            <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_rgba(62,193,211,1)]">
              <div className="text-4xl">🦈</div>
              <h2 className="mt-4 text-2xl font-black">The shark</h2>
              <p className="mt-3 font-medium text-gray-700">
                An AI mentor who reads every commit, asks curious questions,
                remembers last session&apos;s struggles — and gets genuinely
                excited about their work. Someone who finally <em>gets it</em>.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_rgba(255,210,63,1)] md:order-2">
              <div className="text-4xl">💰</div>
              <h2 className="mt-4 text-2xl font-black">The treasure</h2>
              <p className="mt-3 font-medium text-gray-700">
                You fund milestones with USDT. When the Shark verifies the work,
                real money lands in your kid&apos;s own wallet. The AI judges;
                code controls how much can move.
              </p>
            </div>
            <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_rgba(122,229,130,1)] md:order-1">
              <div className="text-4xl">🌱</div>
              <h2 className="mt-4 text-2xl font-black">Back a builder</h2>
              <p className="mt-3 font-medium text-gray-700">
                Not just parents — <em>anyone</em> can deposit USDT into a kid&apos;s
                project via QR code. Grandparents, neighbors, family friends:
                visible stake in a kid shipping. Like GoFundMe, but the AI verifies
                the work before money moves.
              </p>
              <Link href="/fund" className="mt-3 inline-block rounded-xl border-2 border-black bg-[#7AE582] px-4 py-2 font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
                See Mateo&apos;s project page →
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          <h2 className="text-center text-3xl font-black">How it works</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "👨‍👩‍👦", "Parent funds a milestone", "100 USDT if you ship 3 checkpoints."],
              ["2", "💻", "Kid builds & checks in daily", "BabyShark reads every commit and coaches."],
              ["3", "🦈", "Pitch time", "BabyShark reviews the repo and asks the hard (curious) questions."],
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
              Read the picture-book version →
            </Link>
          </p>
        </section>

        {/* Safety band */}
        <section className="mt-6 rounded-3xl border-4 border-black bg-black p-8 text-white shadow-[12px_12px_0_0_rgba(255,107,157,1)]">
          <h2 className="text-3xl font-black">
            Parents stay in control. <span className="bg-[#3EC1D3] px-2 text-black">Always.</span>
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="font-black text-[#FFD23F]">You set the budget</p>
              <p className="mt-2 text-gray-300">Fixed milestone amounts. The AI can never invent more.</p>
            </div>
            <div>
              <p className="font-black text-[#FFD23F]">Code guards the money</p>
              <p className="mt-2 text-gray-300">
                A deterministic policy engine — not the AI — approves every payout.
                Big ones need your explicit OK.
              </p>
            </div>
            <div>
              <p className="font-black text-[#FFD23F]">Your kid owns their wallet</p>
              <p className="mt-2 text-gray-300">
                Keys generated in your browser via Tether&apos;s WDK. Rewards go straight to them — no middleman.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-6 mb-4">
          <h2 className="mb-4 text-center text-3xl font-black">Questions we get 🤔</h2>
          <div className="mx-auto max-w-4xl space-y-3">
            <Faq q="Can someone prompt-inject the agent into draining the treasury?">
              They can convince it to say anything — but there is nothing for it to do. The LLM
              has no send tool and no keys. Its only money surface is a propose_payout() request
              that deterministic code checks against five hard rules (budget, recipient pinning,
              milestone state). Worst case: a rejected proposal in the audit log.
            </Faq>
            <Faq q="Who custodies the funds? Is a company holding them?">
              No. Both wallets are generated on the family&apos;s own device — keys created
              in-browser during setup and encrypted locally. There is no hosted balance to freeze
              or lose. Transfers are ordinary on-chain USDT transactions verifiable by anyone.
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
            <Faq q="What's the tech stack?">
              Next.js + Vercel AI SDK (agent loop), TypeScript policy engine with vitest coverage,
              Tether WDK (CLI + SDK) for self-custodial wallets and transfers, OpenZeppelin for the
              demo token, Foundry for deployment, GitHub REST API for verification. Full diagrams
              in the repo&apos;s docs/ folder.
            </Faq>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-6 mb-4 rounded-3xl border-4 border-black bg-white p-10 text-center shadow-[12px_12px_0_0_rgba(62,193,211,1)]">
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
          <Link href="/how-it-works" className="underline hover:text-black">Technical deep-dive</Link>
          {" "}· Self-custodial by design
        </footer>
      </div>
    </main>
  );
}
