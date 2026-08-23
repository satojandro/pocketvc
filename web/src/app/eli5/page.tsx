import Link from "next/link";

const CHECKER = "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px";

const STEPS = [
  { emoji: "👨‍👩‍👦", big: "Dad locks 100 USDT", tiny: "\"3 checkpoints = paid\"" },
  { emoji: "💻", big: "Mateo builds", tiny: "BabyShark coaches daily" },
  { emoji: "🔍", big: "BabyShark checks", tiny: "real commits, real code" },
  { emoji: "🛡️", big: "Code approves", tiny: "AI can only ask" },
  { emoji: "💸", big: "Mateo gets paid", tiny: "his wallet, his keys" },
];

export default function Eli5() {
  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-lg font-black">🦈 BabyShark, explained with pictures</span>
          <Link href="/" className="rounded-xl border-2 border-black px-4 py-2 text-sm font-bold hover:bg-yellow-100">
            ← Home
          </Link>
        </header>

        {/* The one-sentence version */}
        <div className="mt-6 rounded-3xl border-4 border-black bg-white p-10 text-center shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          <p className="text-4xl">🦈💰</p>
          <p className="mt-4 text-3xl font-black leading-snug">
            An AI coach pays kids<br />
            <span className="bg-yellow-300 px-2">real money</span> for<br />
            building real things.
          </p>
        </div>

        {/* The flow — one giant visual, few words */}
        <div className="mt-6 space-y-0">
          {STEPS.map((s, i) => (
            <div key={i}>
              <div className="rounded-3xl border-4 border-black bg-white p-8 text-center shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
                <p className="text-7xl">{s.emoji}</p>
                <p className="mt-3 text-3xl font-black leading-tight">{s.big}</p>
                <p className="mt-1 text-lg font-semibold text-gray-500">{s.tiny}</p>
              </div>
              {i < STEPS.length - 1 && (
                <p className="py-2 text-center text-4xl font-black text-black/80">↓</p>
              )}
            </div>
          ))}
        </div>

        {/* Three rules, three icons */}
        <div className="mt-6 rounded-3xl border-4 border-black bg-black p-8 text-center text-white shadow-[12px_12px_0_0_rgba(255,107,157,1)]">
          <p className="text-2xl font-black">Three promises 🔒</p>
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-5xl">🤖🚫💵</p>
              <p className="mt-1 font-bold">The AI can never touch the money. Only ask.</p>
            </div>
            <div>
              <p className="text-5xl">🔑👦</p>
              <p className="mt-1 font-bold">The kid holds the keys. Not your keys, not your coins.</p>
            </div>
            <div>
              <p className="text-5xl">📜👀</p>
              <p className="mt-1 font-bold">Every decision is written down. Parents see everything.</p>
            </div>
          </div>
        </div>

        {/* Ending */}
        <div className="mt-6 mb-4 rounded-3xl border-4 border-black bg-white p-10 text-center shadow-[12px_12px_0_0_rgba(62,193,211,1)]">
          <p className="text-6xl">🎉</p>
          <p className="mt-3 text-2xl font-black">Chores taught responsibility.<br />BabyShark teaches building.</p>
          <Link href="/chat" className="mt-6 inline-block rounded-2xl border-2 border-black bg-[#FFD23F] px-8 py-3 text-lg font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            Meet the Shark →
          </Link>
          <p className="mt-4 text-sm font-bold text-gray-500">
            Skeptic? Read{" "}
            <Link href="/how-it-works" className="underline decoration-4 decoration-[#3EC1D3] underline-offset-4">
              exactly how it works under the hood →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
