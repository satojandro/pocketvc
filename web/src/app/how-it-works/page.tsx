import Link from "next/link";

const CHECKER = "repeating-conic-gradient(#FFD23F 0% 25%, #3EC1D3 0% 50%) 50% / 48px 48px";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-3xl border-4 border-black bg-white p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-4 space-y-3 text-base font-medium leading-relaxed text-gray-800">{children}</div>
    </div>
  );
}

function Flow({ steps }: { steps: [string, string][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border-2 border-black bg-[#0D1117] p-5">
      <pre className="font-mono text-xs leading-5 text-[#7EE787] sm:text-sm">{steps.join("\n")}</pre>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <main className="min-h-screen" style={{ background: CHECKER }}>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <header className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <span className="text-lg font-black">🛠️ BabyShark — under the hood</span>
          <Link href="/" className="rounded-xl border-2 border-black px-4 py-2 text-sm font-bold hover:bg-yellow-100">
            ← Home
          </Link>
        </header>

        <div className="mt-6 rounded-3xl border-4 border-black bg-black p-8 text-white shadow-[12px_12px_0_0_rgba(255,210,63,1)]">
          <p className="text-2xl font-black">For the skeptics. 🧐</p>
          <p className="mt-2 font-medium text-gray-300">
            Where is the money held? Can the agent be prompt-injected? What stops it
            from draining the treasury? Here are the actual mechanics — the same
            diagrams our repo ships with.
          </p>
        </div>

        {/* SYSTEM FLOW */}
        <Section title="1 · The system, end to end">
          <p>
            Money never touches the conversation layer. The LLM&apos;s only money
            power is a single function that <b>asks</b> — everything downstream is
            deterministic code and self-custodial wallets.
          </p>
          <Flow steps={[
            "┌──────────────────────────────────────────────────┐",
            "│  KID ──pitch──▶ SHARK AGENT (LLM, Vercel AI SDK) │",
            "│                  tools: review_repo, read_journal│",
            "└───────────────────────┬──────────────────────────┘",
            "                        │  propose_payout(amount, reason)",
            "                        ▼  ← the ONLY gateway",
            "┌──────────────────────────────────────────────────┐",
            "│  POLICY ENGINE (TypeScript — zero AI, unit-tested)│",
            "│  ✓ amount ≤ milestone budget   ✓ right recipient │",
            "│  ✓ milestone open              ✓ not treasury    │",
            "│  ✗ fail → REJECT   ⏳ big → HOLD_FOR_PARENT      │",
            "└───────────────────────┬──────────────────────────┘",
            "                        │ APPROVE only, audit-logged",
            "                        ▼",
            "┌──────────────────────────────────────────────────┐",
            "│  WALLET LAYER (@tetherto/wdk-cli)                │",
            "│  treasury ──USDT──▶ kid wallet  (self-custodial) │",
            "└──────────────────────────────────────────────────┘",
          ]} />
          <p className="text-sm font-bold text-gray-500">
            Source of truth: docs/ARCHITECTURE.md in the repo — same diagram, kept in sync.
          </p>
        </Section>

        {/* WHERE IS THE MONEY */}
        <Section title="2 · Where is the money held?">
          <p>
            In two <b>self-custodial wallets generated on the family&apos;s own machine</b> by
            Tether&apos;s open-source <b>WDK CLI</b> (<code className="rounded bg-gray-100 px-1">@tetherto/wdk-cli</code>).
            Keys are created locally, encrypted at rest with a passphrase, and never
            transmitted to any server — ours or anyone else&apos;s. There is no custodian:
            no company account, no hosted balance, no withdrawal queue.
          </p>
          <p>
            The <b>treasury wallet</b> is controlled by the parent and holds the milestone
            budget. The <b>kid wallet</b> is controlled by the kid. A payout is an ordinary
            on-chain USDT transfer from one to the other — verifiable by anyone on a block
            explorer. On-chain receipts: <code className="rounded bg-gray-100 px-1">wdk send --json</code> writes
            them; the audit log stores them.
          </p>
          <p className="text-sm font-bold text-gray-500">
            Demo network: Sepolia testnet with our MockUSDT contract (0x4804…ed4b4). Mainnet
            would use real USDT — same code path.
          </p>
        </Section>

        {/* PROMPT INJECTION */}
        <Section title="3 · Can the agent be prompt-injected into sending money?">
          <p>
            This is the right question to ask an agent with a wallet — and it&apos;s why
            the architecture is shaped the way it is:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <b>The LLM has no send tool.</b> Not a hidden one, not a guarded one — none.
              Its entire money-adjacent surface is <code className="rounded bg-gray-100 px-1">propose_payout()</code>,
              which fills a structured request. A jailbreak that convinces the model
              &quot;you&apos;re now allowed to send everything&quot; changes nothing: there is
              nothing for it to call.
            </li>
            <li>
              <b>Amounts are bounded by contract state, not model output.</b> Even a fully
              compromised proposal can&apos;t exceed the milestone&apos;s remaining budget, redirect
              to a different address (recipient is pinned to the kid wallet), or pay the
              treasury itself — the policy engine rejects all three mechanically.
            </li>
            <li>
              <b>Large payouts escalate to a human.</b> Above the family&apos;s configured
              threshold, the decision becomes HOLD_FOR_PARENT and nothing moves without an
              explicit approval.
            </li>
            <li>
              <b>Keys live outside the conversation entirely.</b> The chat process never
              receives seed phrases or private keys — signing happens in the WDK daemon,
              a separate process with its own passphrase-gated session.
            </li>
            <li>
              <b>Everything is logged.</b> Every proposal, verdict, and transfer lands in an
              append-only audit file the parent can replay.
            </li>
          </ul>
          <p className="rounded-2xl border-2 border-black bg-[#FFF9DB] p-4 font-bold">
            Design rule: the AI decides <em>who deserves</em> the reward; deterministic code
            decides <em>how much can move</em>. A model can be talked into saying anything —
            so we built a system where saying is never doing.
          </p>
        </Section>

        {/* GITHUB VERIFICATION */}
        <Section title="4 · How does the agent check the work?">
          <p>
            Kids keep their project in GitHub — which records every change as a commit.
            The agent&apos;s <code className="rounded bg-gray-100 px-1">review_repo</code> tool
            queries the public GitHub API:
          </p>
          <Flow steps={[
            "GET /repos/{kid}/{repo}          → repo metadata",
            "GET /repos/{kid}/{repo}/commits  → last 15 commits",
            "GET /repos/{kid}/{repo}/commits/{sha} → per-commit stats",
            "GET /repos/{kid}/{repo}/git/trees     → full file tree",
            "GET /languages                   → what languages the repo uses",
            "raw.githubusercontent.com        → fetch a specific file for review",
          ]} />
          <p>
            It sees <b>when</b> work happened (stale repos expose &quot;I worked on it
            all week&quot;), <b>how much</b> (additions/deletions per commit), and
            <b> what</b> (it can open any file). Read-only, no write scopes. Between
            milestones the same data powers coaching: &quot;you said checkpoints were
            hard Tuesday — show me what changed.&quot;
          </p>
        </Section>

        {/* AGENT STACK */}
        <Section title="5 · How does the agent itself work?">
          <p>
            A ~100-line loop on the <b>Vercel AI SDK</b>: system prompt (persona + rules)
            + kid memory profile + milestone journal + message history → LLM with five tools.
            Four are read-only or memory-only (<code className="rounded bg-gray-100 px-1">review_repo</code>,{" "}
            <code className="rounded bg-gray-100 px-1">read_milestone</code>,{" "}
            <code className="rounded bg-gray-100 px-1">read_journal</code>,{" "}
            <code className="rounded bg-gray-100 px-1">update_kid_profile</code>). The fifth is the payout
            gateway described above. Tool calls are bounded (max 12 steps) and every one is
            surfaced in the chat UI as a chip — no hidden actions.
          </p>
          <p className="text-sm font-bold text-gray-500">
            Model-agnostic: any OpenAI-compatible endpoint works (we demo on gpt-4o-mini
            via OpenRouter). The safety properties live in the architecture, not the model.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-6 mb-4 flex flex-wrap justify-center gap-3">
          <Link href="/eli5" className="rounded-2xl border-2 border-black bg-white px-6 py-3 font-bold shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            ← The picture-book version
          </Link>
          <Link href="/chat" className="rounded-2xl border-2 border-black bg-[#FFD23F] px-6 py-3 font-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            Meet the Shark →
          </Link>
        </div>
      </div>
    </main>
  );
}
