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
          <span className="text-xl font-black">🦈 How BabyShark works — explained simply</span>
          <Link href="/" className="rounded-xl border-2 border-black px-4 py-2 text-sm font-bold hover:bg-yellow-100">
            ← Home
          </Link>
        </header>

        <div className="mt-6 space-y-6">
          {/* The old way */}
          <Card shadow="#FF6B9D">
            <p className="text-2xl font-black">How kids earn money today 🗑️</p>
            <p className="mt-3 text-lg font-medium">
              Take out the trash: $5/week. Mow the lawn: $20. Simple deal — except:
              Dad forgets to pay… for weeks. Or the money sits in &quot;your&quot; drawer
              that&apos;s actually <em>his</em> drawer. Nobody kept score.
            </p>
            <p className="mt-3 text-lg font-black">
              Now imagine earning money by building real things instead — and
              getting paid instantly, every time, into a wallet that&apos;s truly yours.
            </p>
            <p className="mt-3 text-sm font-bold text-gray-500">
              That&apos;s BabyShark. Here&apos;s exactly how it works, piece by piece. 👇
            </p>
          </Card>

          {/* Piece 1: the commitment */}
          <Card>
            <p className="text-xl font-black text-[#FF6B9D]">PIECE 1 — THE COMMITMENT</p>
            <h2 className="mt-2 text-2xl font-black">Mom or Dad puts up a bounty 💰</h2>
            <p className="mt-3 text-lg font-medium">
              Before any work starts, the parent locks money to a clear rule:
            </p>
            <p className="mt-3 rounded-2xl border-2 border-black bg-[#FFF9DB] p-4 text-center text-lg font-bold">
              &quot;100 USDT if your obby ships with 3 working checkpoints.&quot;
            </p>
            <p className="mt-3 text-lg font-medium">
              The money goes into a <b>treasury wallet</b> controlled by the parent.
              Everyone knows the deal <em>before</em> the work starts. No &quot;I forgot,&quot;
              no &quot;did I pay you already?&quot; — it&apos;s written down forever.
            </p>
          </Card>

          {/* Piece 2: how the agent judges */}
          <Card shadow="#3EC1D3">
            <p className="text-xl font-black text-[#3EC1D3]">PIECE 2 — THE JUDGE</p>
            <h2 className="mt-2 text-2xl font-black">How does the AI know the work is done? 🔍</h2>
            <p className="mt-3 text-lg font-medium">
              Kids save their work in GitHub — a website that records every change
              they make, like a diary for code. BabyShark reads that diary:
            </p>
            <div className="mt-4 space-y-2">
              {[
                ["📖", "It reads the commits", "Every saved change, with dates and what was edited"],
                ["🧮", "It checks the details", "Lines added, files touched, when it happened"],
                ["💬", "It asks the kid questions", "\"Walk me through how the checkpoint works\" — to test understanding, not just memory"],
                ["🚫", "It catches bluffing", "Claimed work but no commits? BabyShark notices — kindly"],
              ].map(([e, t, d]) => (
                <div key={t} className="flex items-start gap-3 rounded-2xl border-2 border-black bg-[#E5F6FF] p-4">
                  <span className="text-2xl">{e}</span>
                  <p className="font-medium"><b>{t}</b> — {d}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-lg font-medium">
              And between milestones it&apos;s not a judge at all — it&apos;s a coach,
              remembering last session&apos;s struggles and cheering this week&apos;s wins.
            </p>
          </Card>

          {/* Piece 3: the safety chain */}
          <Card shadow="#7AE582">
            <p className="text-xl font-black text-[#05C46B]">PIECE 3 — THE MONEY RULES</p>
            <h2 className="mt-2 text-2xl font-black">Can the AI just hand out cash?? 😳</h2>
            <p className="mt-3 text-lg font-medium">Nope. Three locks on the treasure chest:</p>
            <div className="mt-4 space-y-3">
              {[
                ["1️⃣", "The AI can only ASK", "It has no payment buttons. It fills out a payout proposal — like a permission slip."],
                ["2️⃣", "A robot accountant approves", "Not-AI code (a \"policy engine\") checks: right amount? right wallet? budget left? If not — rejected."],
                ["3️⃣", "Big payouts need a parent tap", "Above the family's limit (say $25), Mom or Dad confirms before anything moves."],
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
            <p className="mt-4 rounded-2xl border-2 border-black bg-[#FFF9DB] p-4 text-center text-lg font-black">
              The AI decides who deserves the reward.<br />Code decides how much can move.
            </p>
          </Card>

          {/* Piece 4: wallets + custody */}
          <Card shadow="#FFD23F">
            <p className="text-xl font-black text-[#F59E0B]">PIECE 4 — THE PIGGY BANK</p>
            <h2 className="mt-2 text-2xl font-black">What&apos;s a wallet? Why is it &quot;self-custodial&quot;? 🔑</h2>
            <p className="mt-3 text-lg font-medium">
              A crypto wallet is a piggy bank opened with a secret key instead of
              a lock. There are two kinds:
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-black bg-red-50 p-4">
                <p className="font-black">🏦 Bank-style (custodial)</p>
                <p className="mt-2 font-medium text-gray-700">
                  A company holds the key &quot;for you.&quot; They can freeze it,
                  lose it, or say no. Like money in Dad&apos;s drawer.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-black bg-green-50 p-4">
                <p className="font-black">🔑 Self-custodial (BabyShark)</p>
                <p className="mt-2 font-medium text-gray-700">
                  The kid holds the key. Nobody can take the money, freeze it,
                  or forget to pay it. It&apos;s genuinely theirs.
                </p>
              </div>
            </div>
            <p className="mt-4 text-lg font-black">
              Crypto people have a saying: <span className="bg-yellow-200 px-1">&quot;not your keys, not your coins.&quot;</span>{" "}
              In BabyShark, the reward lands in a wallet <em>the kid controls</em> —
              generated on their family&apos;s own computer via Tether&apos;s open-source
              Wallet Development Kit (WDK). No company in the middle. Ever.
            </p>
          </Card>

          {/* Piece 5: why WDK */}
          <Card shadow="#3EC1D3">
            <p className="text-xl font-black text-[#0E7490]">PIECE 5 — THE ENGINE</p>
            <h2 className="mt-2 text-2xl font-black">Why WDK? ⚙️</h2>
            <p className="mt-3 text-lg font-medium">
              Building wallets is hard and dangerous if done wrong. So we build on{" "}
              <b>WDK — Tether&apos;s open-source Wallet Development Kit</b>: audited,
              battle-tested tools that handle keys, addresses, balances, and USDT
              transfers across many blockchains with one consistent interface.
            </p>
            <ul className="mt-4 space-y-2 font-medium text-gray-700">
              <li>✅ Keys are generated and stay on your device — never on a server</li>
              <li>✅ USDT = digital dollars, so rewards are real money, not points</li>
              <li>✅ Open source — anyone can check the code does what it says</li>
            </ul>
          </Card>

          {/* Ending */}
          <Card>
            <p className="text-2xl font-black">The whole picture 🧩</p>
            <p className="mt-3 text-lg font-medium">
              Parent commits → kid builds with an AI coach → AI verifies the work →
              robot accountant guards the rules → reward lands in the kid&apos;s own
              wallet, instantly, every time.
            </p>
            <p className="mt-4 text-center text-xl font-black">
              Chores taught responsibility.<br />
              BabyShark teaches building — and pays like it means it. 🦈💰
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/chat" className="inline-block rounded-2xl border-2 border-black bg-[#FFD23F] px-8 py-3 text-lg font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                Try BabyShark →
              </Link>
              <Link href="/eli5" className="hidden" aria-hidden />
              <Link href="/parent" className="inline-block rounded-2xl border-2 border-black bg-white px-8 py-3 text-lg font-bold shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                See the parent dashboard
              </Link>
            </div>
          </Card>
        </div>

        <footer className="py-6 text-center text-sm font-semibold text-black/60">
          Built at Aleph Hackathon 2026 · Powered by Tether WDK · Not your keys, not your coins — so we gave the kid the keys
        </footer>
      </div>
    </main>
  );
}
