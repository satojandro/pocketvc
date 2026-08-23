import Image from "next/image";
import Link from "next/link";

const CHECKER = "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px";

export default function Landing() {
  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Nav */}
        <nav className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-2xl font-black tracking-tight">BabyShark VC 🦈</span>
          <div className="flex gap-3">
            <Link href="/chat" className="rounded-xl border-2 border-black px-4 py-2 font-bold hover:bg-yellow-100">
              Kid login
            </Link>
            <Link href="/setup" className="rounded-xl border-2 border-black bg-white px-4 py-2 font-bold hover:bg-pink-100">
              Family setup
            </Link>
            <Link href="/fund" className="rounded-xl border-2 border-black bg-[#7AE582] px-4 py-2 font-bold hover:bg-green-200">
              Back a kid 🌱
            </Link>
            <Link href="/parent" className="rounded-xl border-2 border-black bg-black px-4 py-2 font-bold text-white hover:bg-gray-800">
              Parent dashboard
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

        {/* Pain / solution */}
        <section id="how" className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_rgba(255,107,157,1)] md:col-span-2">
            <div className="text-4xl">😕</div>
            <h2 className="mt-4 text-2xl font-black">Two gaps nobody bridges</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-black bg-[#FFE5EE] p-4">
                <p className="font-black">😶 The visibility gap</p>
                <p className="mt-2 font-medium text-gray-700">
                  You can&apos;t read the code, so &quot;show me what you built&quot;
                  dies in week one — and &quot;yeah dad, I worked on it&quot; goes undetected.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-black bg-[#E5F6FF] p-4">
                <p className="font-black">🤞 The funding trust gap</p>
                <p className="mt-2 font-medium text-gray-700">
                  Even when family wants to fund a kid&apos;s project, money goes
                  on faith — with no way to verify what actually got delivered.
                </p>
              </div>
            </div>
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
          <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_rgba(255,210,63,1)]">
            <div className="text-4xl">💰</div>
            <h2 className="mt-4 text-2xl font-black">The treasure</h2>
            <p className="mt-3 font-medium text-gray-700">
              You fund milestones with USDT. When the Shark verifies the work,
              real money lands in your kid&apos;s own wallet. The AI judges;
              code controls how much can move.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          <h2 className="text-center text-3xl font-black">How it works</h2>
          <div className="mt-8 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
            {[
              ["1", "👨‍👩‍👦", "Parent funds a milestone", "100 USDT if you ship 3 checkpoints."],
              ["2", "💻", "Kid builds & checks in daily", "BabyShark reads every commit and coaches."],
              ["3", "🦈", "Pitch time", "BabyShark reviews the repo and asks the hard (curious) questions."],
              ["4", "💸", "Policy-gated payout", "Verified work → USDT lands in the kid's own wallet."],
            ].map(([n, emoji, title, sub], i, arr) => (
              <div key={n} className="flex flex-1 flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-[#FFD23F] text-xl font-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">{n}</div>
                <div className="mt-2 text-3xl">{emoji}</div>
                <p className="mt-2 font-black leading-tight">{title}</p>
                <p className="mt-1 text-sm font-medium text-gray-600">{sub}</p>
                {i < arr.length - 1 && <div className="hidden text-2xl font-black md:absolute md:right-0 md:top-1/2 md:block" aria-hidden>→</div>}
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
                Self-custodial via Tether&apos;s WDK. Rewards go straight to them — no middleman.
              </p>
            </div>
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
          Built at Aleph Hackathon 2026 · Tether WDK Track · Self-custodial by design
        </footer>
      </div>
    </main>
  );
}
