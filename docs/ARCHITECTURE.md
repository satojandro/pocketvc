# PocketVC — System Map

Where the reasoning lives, where the money rules live, where transfers happen.

```
                        POCKETVC — SYSTEM MAP
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
│  WALLET LAYER (@tetherto/wdk-cli) ── Phase 0 ✅ │
│                                                 │
│  TREASURY wallet ──send USDT──▶ KID wallet     │
│  (parent custody)        (kid self-custody)     │
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
