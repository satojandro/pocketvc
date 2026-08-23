# PocketVC — System Map

Where the reasoning lives, where the money rules live, where transfers happen.

```
                        BABYSHARK VC — SYSTEM MAP
                        =====================

  KID                          PARENT
   │  "I finished the obby!"      │  funds milestone contract
   │  daily: "look what I tried"  │  (sets amount + criteria)
   ▼                              ▼
┌─────────────────────────────────────────────────┐
│  SHARK AGENT  ── Phase 2/3                      │
│  (LLM via Vercel AI SDK — the REASONING layer)  │
│                                                 │
│  • reads repo: commits, diffs (GitHub API)      │
│  • mentors between milestones (daily standups,  │
│    session memory, curiosity-driven questions)  │
│  • renders verdicts + reasoning                 │
│                                                 │
│  Persona: supportive coach who happens to hold  │
│  the checkbook. Bluff-proof: reads real commits.│
│                                                 │
│  TOOLS IT HAS:            TOOLS IT LACKS:       │
│   ✓ review_repo()         ✗ send_money          │
│   ✓ read_milestone()      ✗ any wallet write    │
│   ✓ propose_payout()                            │
└───────────────┬─────────────────────────────────┘
                │ propose_payout(amount, reason)
                ▼
┌─────────────────────────────────────────────────┐
│  POLICY ENGINE ── Phase 1                       │
│  (deterministic TypeScript — NO AI)             │
│                                                 │
│  ✓ amount ≤ milestone remaining?                │
│  ✓ milestone already fully paid?                │
│  ✓ recipient == contract's kid address?         │
│  ✓ above parent-confirm threshold? → HOLD       │
│  ✗ any failure → REJECT + audit log entry       │
└───────────────┬─────────────────────────────────┘
                │ approved payout
                ▼
┌─────────────────────────────────────────────────┐
│  WALLET LAYER (WDK CLI + SDK) ──── Phase 0 ✅   │
│                                                 │
│  PROJECT POOL ──send USDT──▶ KID wallet         │
│  (escrow: parent+backers) (kid self-custody)   │
│  --json receipts → audit trail                  │
│                                                 │
│  Sepolia · MockUSDT 0x4804e2da…ed4b4            │
└─────────────────────────────────────────────────┘
```

## Money-flow invariant

Nothing crosses from the conversation into a transaction except through the single
`propose_payout` gate. The LLM cannot invent amounts beyond the milestone budget,
cannot change recipients, and has no direct access to keys or send commands.
Every proposal → decision → transfer is logged as an auditable triple.

## Design principles

1. **Judgment is the LLM's job** — does the work merit the reward?
2. **Authorization is code's job** — is this verdict allowed to pay, and how much?
3. **Execution is WDK's job** — self-custodial wallets, signed locally, JSON receipts.
4. **The kid feels coached, not judged** — hostile grilling kills motivation; curiosity feeds it.
5. **Partial payouts are normal** — milestones unlock in slices; feedback names what was great first.

---

# BabyShark Agent — Anatomy

The agent itself: what the LLM sees, what tools it has, and the one narrow gate to money.

```
                              ┌──────────────┐
   kid message ──────────────▶│  CHAT LOOP    │◀────── streaming UI
                              │ (AI SDK:      │       (ai-chatbot /
                              │  streamText + │        useChat)
                              │  maxSteps)    │
                              └──────┬────────┘
                                     │ assembles each LLM call from:
                                     ▼
        ┌────────────────────────────────────────────────────┐
        │                    PROMPT STACK                     │
        │                                                    │
        │  1. SYSTEM PROMPT — the persona:                   │
        │     supportive coach · curiosity-driven questions  │
        │     verdict framing · never adversarial            │
        │  2. KID PROFILE (memory) — skill level, interests, │
        │     past struggles, what motivates them            │
        │  3. MILESTONE JOURNAL — contracts, past verdicts,  │
        │     payouts (from policy engine audit log)         │
        │  4. THIS SESSION'S MESSAGE HISTORY                 │
        └────────────────────────────┬───────────────────────┘
                                     │
                                     │ LLM decides which tools to call
                                     ▼
        ┌────────────────────────────────────────────────────┐
        │                       TOOLS                         │
        │                                                    │
        │  READ (safe):                                      │
        │   🔍 review_repo()      → GitHub API: commits,     │
        │                            diffs, file tree        │
        │   📋 read_milestone()   → contract state           │
        │   📔 read_journal()     → past sessions/verdicts   │
        │                                                    │
        │  WRITE (memory only):                              │
        │   🧠 update_kid_profile() → insights file          │
        │                                                    │
        │  MONEY (the ONLY gateway):                         │
        │   💰 propose_payout(amount, milestoneId, reason)   │
        └────────────────────────────┬───────────────────────┘
                                     │
                                     ▼
                     ╔═══════════════════════════════╗
                     ║      POLICY ENGINE (no AI)     ║
                     ║  caps · budgets · recipients   ║
                     ║  APPROVE / REJECT / HOLD       ║
                     ╚════════════╦══════════════════╝
                                  │ APPROVE only
                                  ▼
                        💳 wdk send (USDT)
                        treasury ──▶ kid wallet

   MEMORY TIERS:
     session history  → chat storage (template provides)
     kid profile      → data/kid.json (agent-updated via tool)
     journal          → policy audit log (reused, not duplicated)

   THE ONE RULE:
     The LLM's entire money power = a function that ASKS.
     Code answers. Keys live outside the conversation entirely.
```

## Implementation status of agent components

| Component | Status | Lives in |
|---|---|---|
| Chat loop | ✅ done | `web/src/app/chat` + `/api/chat` |
| Prompt stack (persona) | ✅ done | `src/agent/prompt.ts` |
| Kid profile memory | ✅ done | `data/kid.json` |
| Milestone proposals (agent drafts → parent approves) | ✅ done | `/api/milestone-proposals` + dashboard |
| review_repo tool | ✅ done | `src/agent/github.ts` |
| propose_payout → engine → executePayout | ✅ done | wired to policy engine + wallet-exec |
| Policy engine (unit-tested ×10) | ✅ done | `src/policy/` |
| Wallet layer (CLI + SDK, 3-wallet custody w/ pool escrow) | ✅ done | wdk-cli + wdk-wallet-evm + Sepolia contracts |
| Web UI (landing/chat/parent/fund/eli5/how-it-works/setup) | ✅ done | `web/src/app/` |
