import Link from "next/link";

const CHECKER = "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px";

/* ---- flat line-art icons (monoline, tiny color fills — Berd/Multiverse style) ---- */

function SharkIcon({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M8 34c6-14 22-20 34-16 6 2 10 6 12 10l-8 2c-2 8-10 14-20 14-8 0-14-4-18-10z" stroke="#111" strokeWidth="2.5" fill="#9BC9E8" />
      <path d="M20 44c2 4 6 6 10 6M40 20l6-8 2 10" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="46" cy="30" r="3" fill="#111" />
      <path d="M50 36l8 4-8 4" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 36c4 2 10 2 14 0" stroke="#111" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DadIcon({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="18" r="10" stroke="#111" strokeWidth="2.5" fill="#FFD23F" />
      <path d="M14 56c0-10 8-16 18-16s18 6 18 16" stroke="#111" strokeWidth="2.5" fill="#3EC1D3" strokeLinecap="round" />
      <circle cx="28" cy="17" r="1.5" fill="#111" />
      <circle cx="36" cy="17" r="1.5" fill="#111" />
      <path d="M28 22c2.5 2 5.5 2 8 0" stroke="#111" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function KidIcon({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="18" r="10" stroke="#111" strokeWidth="2.5" fill="#FF6B9D" />
      <path d="M14 56c0-10 8-16 18-16s18 6 18 16" stroke="#111" strokeWidth="2.5" fill="#7AE582" strokeLinecap="round" />
      <circle cx="28" cy="17" r="1.5" fill="#111" />
      <circle cx="36" cy="17" r="1.5" fill="#111" />
      <path d="M27 22c3 3 7 3 10 0" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 10c2-4 8-6 14-3" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function RobotAccountantIcon({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="14" y="20" width="36" height="28" rx="6" stroke="#111" strokeWidth="2.5" fill="#EDEDF7" />
      <line x1="32" y1="12" x2="32" y2="20" stroke="#111" strokeWidth="2.5" />
      <circle cx="32" cy="10" r="3" fill="#3EC1D3" stroke="#111" strokeWidth="2" />
      <rect x="20" y="28" width="8" height="8" rx="2" stroke="#111" strokeWidth="2" fill="#7AE582" />
      <rect x="36" y="28" width="8" height="8" rx="2" stroke="#111" strokeWidth="2" fill="#FFD23F" />
      <path d="M24 42h16" stroke="#111" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="18" width="44" height="32" rx="6" stroke="#111" strokeWidth="2.5" fill="#FFD23F" />
      <path d="M10 26h44" stroke="#111" strokeWidth="2" />
      <rect x="38" y="30" width="16" height="12" rx="4" stroke="#111" strokeWidth="2.5" fill="#7AE582" />
      <circle cx="46" cy="36" r="2" fill="#111" />
      <path d="M18 12l4 6M32 10v8M46 12l-4 6" stroke="#FFD23F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function RepoIcon({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="10" width="44" height="44" rx="6" stroke="#111" strokeWidth="2.5" fill="#F6F8FA" />
      <path d="M10 22h44" stroke="#111" strokeWidth="2" />
      <circle cx="17" cy="16" r="2" fill="#FF6B9D" />
      <circle cx="24" cy="16" r="2" fill="#FFD23F" />
      <circle cx="31" cy="16" r="2" fill="#7AE582" />
      <path d="M18 30l-4 4 4 4M28 30l4 4-4 4M34 42l6-12" stroke="#3EC1D3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow({ label, flip = false }: { label: string; flip?: boolean }) {
  return (
    <div className={`flex items-center gap-3 py-1 ${flip ? "flex-row-reverse" : ""}`}>
      <svg width="90" height="24" viewBox="0 0 90 24" className={flip ? "rotate-180" : ""} aria-hidden>
        <line x1="0" y1="12" x2="78" y2="12" stroke="#111" strokeWidth="2.5" strokeDasharray="6 4" />
        <polygon points="78,5 90,12 78,19" fill="#111" />
      </svg>
      <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
        {label}
      </span>
    </div>
  );
}

function Frame({ children, bg = "#FFFFFF" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="rounded-3xl border-4 border-black p-6 shadow-[10px_10px_0_0_rgba(0,0,0,1)]" style={{ background: bg }}>
      {children}
    </div>
  );
}

function StepNumber({ n, color }: { n: number; color: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-6xl font-black leading-none" style={{ color }}>{n}</span>
      <div className="pt-1">{null}</div>
    </div>
  );
}

export default function Eli5() {
  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-lg font-black">🦈 BabyShark — the whole loop, one picture at a time</span>
          <Link href="/" className="rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold hover:bg-yellow-100">
            ← Home
          </Link>
        </header>

        {/* Title frame */}
        <div className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black leading-tight">How does BabyShark work?</h1>
          <p className="mt-3 text-lg font-medium text-gray-700">
            One shark turns a kid&apos;s code into real money in their pocket.
            Here&apos;s the whole loop, one picture at a time.
          </p>
        </div>

        {/* FRAME 1 */}
        <div className="mt-8">
          <div className="flex items-start gap-4">
            <span className="text-7xl font-black leading-none text-[#FF6B9D]">1</span>
            <h2 className="pt-2 text-3xl font-black">Dad makes a promise. 🤙</h2>
          </div>
          <Frame bg="#FFF7F9">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex flex-col items-center">
                <DadIcon />
                <span className="mt-1 text-sm font-bold">Dad</span>
              </div>
              <Arrow label="locks 100 USDT" />
              <div className="flex flex-col items-center">
                <WalletIcon />
                <span className="mt-1 text-sm font-bold">the treasure chest</span>
              </div>
            </div>
            <p className="mt-4 text-center text-lg font-medium">
              &quot;100 USDT if your obby ships with <b>3 working checkpoints</b>.&quot;
            </p>
            <p className="mt-2 text-center text-sm font-semibold text-gray-500">
              The promise is locked before any work starts. No &quot;I forgot to pay you.&quot;
            </p>
          </Frame>
        </div>

        {/* FRAME 2 */}
        <div className="mt-8">
          <div className="flex items-start gap-4">
            <span className="text-7xl font-black leading-none text-[#3EC1D3]">2</span>
            <h2 className="pt-2 text-3xl font-black">Mateo builds. BabyShark watches. 👀</h2>
          </div>
          <Frame bg="#F2FBFD">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex flex-col items-center">
                <KidIcon />
                <span className="mt-1 text-sm font-bold">Mateo</span>
              </div>
              <Arrow label="saves every change" />
              <div className="flex flex-col items-center">
                <RepoIcon />
                <span className="mt-1 text-sm font-bold">the code diary</span>
              </div>
              <Arrow label="reads it all" />
              <div className="flex flex-col items-center">
                <SharkIcon />
                <span className="mt-1 text-sm font-bold">BabyShark</span>
              </div>
            </div>
            <p className="mt-4 text-center text-lg font-medium">
              GitHub records every change Mateo makes — like a diary that can&apos;t lie.
              BabyShark reads it daily, coaches him, and remembers what was hard last week.
            </p>
          </Frame>
        </div>

        {/* FRAME 3 */}
        <div className="mt-8">
          <div className="flex items-start gap-4">
            <span className="text-7xl font-black leading-none text-[#7AE582]">3</span>
            <h2 className="pt-2 text-3xl font-black">&quot;I&apos;m done!&quot; — says who? 🕵️</h2>
          </div>
          <Frame bg="#F4FCF0">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex flex-col items-center">
                <RepoIcon />
                <span className="mt-1 text-sm font-bold">the evidence</span>
              </div>
              <Arrow label="commits + diffs + dates" />
              <div className="flex flex-col items-center">
                <SharkIcon />
                <span className="mt-1 text-sm font-bold">the verdict</span>
              </div>
            </div>
            <p className="mt-4 text-center text-lg font-medium">
              BabyShark checks the diary: did the checkpoints appear? When? Can Mateo
              explain how they work? Claimed work with no diary entries? The shark notices — kindly. 😌
            </p>
          </Frame>
        </div>

        {/* FRAME 4 */}
        <div className="mt-8">
          <div className="flex items-start gap-4">
            <span className="text-7xl font-black leading-none text-[#111]">4</span>
            <h2 className="pt-2 text-3xl font-black">The shark can&apos;t pay. It can only ask. 🙅</h2>
          </div>
          <Frame bg="#FBFBFE">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex flex-col items-center">
                <SharkIcon />
                <span className="mt-1 text-sm font-bold">files a request</span>
              </div>
              <Arrow label='"pay Mateo 50 USDT"' />
              <div className="flex flex-col items-center">
                <RobotAccountantIcon />
                <span className="mt-1 text-sm font-bold">the robot accountant</span>
              </div>
            </div>
            <p className="mt-4 text-center text-lg font-medium">
              The shark has <b>no money buttons</b>. It fills out a permission slip.
              The robot accountant — plain code, zero AI — checks the rules:
              right amount? right wallet? money left in the chest?
            </p>
            <p className="mt-3 text-center text-lg font-black">
              Big payouts also need Dad&apos;s 👍. Every decision gets written down. 📜
            </p>
          </Frame>
        </div>

        {/* FRAME 5 */}
        <div className="mt-8">
          <div className="flex items-start gap-4">
            <span className="text-7xl font-black leading-none text-[#F59E0B]">5</span>
            <h2 className="pt-2 text-3xl font-black">Paid. Into HIS piggy bank. 🎉</h2>
          </div>
          <Frame bg="#FFFBEB">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex flex-col items-center">
                <WalletIcon />
                <span className="mt-1 text-sm font-bold">the treasure chest</span>
              </div>
              <Arrow label="50 USDT, on-chain" />
              <div className="flex flex-col items-center">
                <KidIcon />
                <span className="mt-1 text-sm font-bold">Mateo&apos;s own wallet</span>
              </div>
            </div>
            <p className="mt-4 text-center text-lg font-medium">
              Mateo&apos;s wallet is opened with a secret key that lives on{" "}
              <b>his family&apos;s computer</b> — made with Tether&apos;s open-source WDK.
              No company holds it. Nobody can freeze it or &quot;forget&quot; to pay.
              <br />
              <b>Not your keys, not your coins — so we gave the kid the keys.</b> 🔑
            </p>
          </Frame>
        </div>

        {/* Loop close */}
        <div className="mt-8 rounded-3xl border-4 border-black bg-black p-8 text-center text-white shadow-[12px_12px_0_0_rgba(255,107,157,1)]">
          <p className="text-2xl font-black">Then the loop runs again. 🔁</p>
          <p className="mt-3 text-lg font-medium text-gray-300">
            New milestone. New skills. Bigger builds. The trash stays un-taken —
            and nobody misses it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/chat" className="rounded-2xl border-2 border-[#FFD23F] bg-[#FFD23F] px-8 py-3 text-lg font-black text-black shadow-[6px_6px_0_0_rgba(255,255,255,0.9)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              Meet the Shark →
            </Link>
            <Link href="/how-it-works" className="rounded-2xl border-2 border-white px-8 py-3 text-lg font-bold text-white transition hover:bg-white/10">
              Skeptic? Under the hood →
            </Link>
          </div>
        </div>

        <footer className="py-6 text-center text-sm font-semibold text-black/60">
          Built at Aleph Hackathon 2026 · Powered by Tether WDK
        </footer>
      </div>
    </main>
  );
}
