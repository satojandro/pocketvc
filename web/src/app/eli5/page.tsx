import Link from "next/link";
import Image from "next/image";

const CHECKER = "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px";

function Card({ children, shadow = "#000" }: { children: React.ReactNode; shadow?: string }) {
  return (
    <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_var(--tw-shadow-color)]"
         style={{ ["--tw-shadow-color" as string]: shadow }}>
      {children}
    </div>
  );
}

export default function Eli5() {
  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-xl font-black">🦈 BabyShark VC — explained simply</span>
          <Link href="/" className="rounded-xl border-2 border-black px-4 py-2 text-sm font-bold hover:bg-yellow-100">
            ← Home
          </Link>
        </header>

        <div className="mt-6 space-y-6">
          <Card>
            <p className="text-2xl font-black">Meet Mateo. 👦</p>
            <p className="mt-3 text-lg font-medium">
              Mateo is 12. He&apos;s building a game called an &quot;obby&quot; —
              an obstacle course in Roblox. He loves it. But there&apos;s a problem…
            </p>
          </Card>

          <Card shadow="#FF6B9D">
            <p className="text-2xl font-black">Nobody can check his work. 😕</p>
            <p className="mt-3 text-lg font-medium">
              Mateo&apos;s dad doesn&apos;t code. So when Dad says
              &quot;show me what you built,&quot; it lasts about two days.
              And when Mateo says &quot;yep, I worked on it&quot; — nobody can tell
              if that&apos;s true.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <div className="flex-1 rounded-2xl border-2 border-black bg-[#FFE5EE] p-4 font-bold">
                😶 The visibility gap: no one who understands the work
              </div>
              <div className="flex-1 rounded-2xl border-2 border-black bg-[#FFE5EE] p-4 font-bold">
                🤞 The trust gap: money given with no way to check delivery
              </div>
            </div>
          </Card>

          <Card shadow="#3EC1D3">
            <p className="text-2xl font-black">Enter BabyShark. 🦈</p>
            <p className="mt-3 text-lg font-medium">
              An AI mentor that <b>reads Mateo&apos;s actual code</b> — every commit,
              every file. It asks curious questions (&quot;wait, why does the lava slow
              down near the flag?&quot;), remembers what he struggled with last time,
              and cheers him on like a coach.
            </p>
            <div className="mx-auto mt-6 h-28 w-28 overflow-hidden rounded-full border-4 border-black">
              <Image src="/shark-hero.png" alt="BabyShark" width={112} height={112} className="h-full w-full object-cover" />
            </div>
          </Card>

          <Card shadow="#FFD23F">
            <p className="text-2xl font-black">And here&apos;s the fun part: real money. 💰</p>
            <p className="mt-3 text-lg font-medium">
              Dad puts <b>100 USDT</b> into a treasure chest for this rule:
            </p>
            <p className="mt-3 rounded-2xl border-2 border-black bg-[#FFF9DB] p-4 text-center text-lg font-bold">
              &quot;Ship an obby with 3 working checkpoints → get paid.&quot;
            </p>
            <p className="mt-3 text-lg font-medium">
              When Mateo says he&apos;s done, BabyShark checks the code.
              If the work is real, money moves to Mateo&apos;s very own wallet.
            </p>
          </Card>

          <Card shadow="#7AE582">
            <p className="text-2xl font-black">Wait — can the AI just give away the money?? 😳</p>
            <p className="mt-3 text-lg font-medium">Nope. That&apos;s the clever bit:</p>
            <div className="mt-4 space-y-3">
              {[
                ["1️⃣", "The AI can only ASK", "It has no money buttons. It fills out a 'payout proposal' like a permission slip."],
                ["2️⃣", "A robot accountant checks it", "Not-AI code makes sure the amount fits the budget and goes to the right wallet."],
                ["3️⃣", "Big payouts need Mom or Dad", "Above $25, a parent taps approve. Every decision is written down forever."],
              ].map(([n, t, d]) => (
                <div key={n} className="flex items-start gap-3 rounded-2xl border-2 border-black bg-[#F0FBF7] p-4">
                  <span className="text-2xl">{n}</span>
                  <div>
                    <p className="font-black">{t}</p>
                    <p className="font-medium text-gray-700">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-2xl font-black">The ending. 🎉</p>
            <p className="mt-3 text-lg font-medium">
              Mateo ships the checkpoints. BabyShark verifies. 50 USDT lands in
              Mateo&apos;s wallet — that he owns, on a real blockchain, with no middleman.
              Dad saw exactly what was built. And Mateo can&apos;t wait to show
              the Shark what&apos;s next.
            </p>
            <p className="mt-4 text-center text-xl font-black">
              Your kid builds. The Shark reviews. Real money moves. 🦈💰
            </p>
            <div className="mt-6 text-center">
              <Link href="/chat" className="inline-block rounded-2xl border-2 border-black bg-[#FFD23F] px-8 py-3 text-lg font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                Try BabyShark →
              </Link>
            </div>
          </Card>
        </div>

        <footer className="py-6 text-center text-sm font-semibold text-black/60">
          Built at Aleph Hackathon 2026 · Powered by Tether WDK · Self-custodial by design
        </footer>
      </div>
    </main>
  );
}
