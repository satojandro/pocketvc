# BabyShark VC — Judge's Guide

**One-pager for reviewers. Everything else in `docs/` expands on this.**

## The idea
An AI mentor-investor for kids who code. Parents commit USDT to clear milestones.
An AI coach reads every commit, teaches daily, verifies progress, and releases
the money only when work checks out — into the kid's own self-custodial wallet.

**The rule that defines us:** the AI decides *who deserves* the reward;
deterministic code decides *how much can move*.

## Three-wallet custody model

| Wallet | Keys held by | Purpose | Seed exposure |
|---|---|---|---|
| Treasury | Parent (client-side) | Parent's own funds | Once at setup |
| Kid wallet | Kid (client-side) | Reward destination — fully theirs | Once at setup |
| Project pool | Server only | Functional escrow: committed + crowdfunded funds | **Never** |

The pool is the escrow: deposits in freely (QR/backer/parent), and the ONLY exit
is a policy-approved payout to the kid's pinned address. Nobody in the family
can raid it. Production upgrade path: swap for an on-chain escrow contract to
make the guarantee cryptographic rather than procedural.

## How WDK is incorporated (not bolted on)

| WDK surface | Where | Why meaningful |
|---|---|---|
| `@tetherto/wdk-wallet-evm` (SDK) | Setup wizard (`web/src/lib/client-wallet.ts`) | Client-side key generation — derivation verified byte-for-byte against the CLI |
| `@tetherto/wdk-cli` (beta.3) | Payout execution, balances, token registry (`web/src/lib/wallet-exec.ts`) | Self-custodial transfers with `--json` receipts; passphrase-gated daemon sessions |
| MoonPay fiat module (`wdk buy`) | Roadmap: card→USDT top-ups | Parents fund treasuries without touching exchanges |

**Key permalinks:**
- Payout execution (only money path): [`web/src/lib/wallet-exec.ts`](../web/src/lib/wallet-exec.ts)
- Agent's propose-only tool: [`web/src/lib/tools.ts`](../web/src/lib/tools.ts) → `propose_payout`
- Policy engine (no AI, unit-tested): [`src/policy/engine.ts`](../src/policy/engine.ts)
- Functional-escrow pool: [`web/src/lib/pool.ts`](../web/src/lib/pool.ts)

## Architecture in 15 seconds

```
Kid pitches ──▶ Shark Agent (LLM) ──propose_payout()──▶ Policy Engine ──APPROVE──▶ Project Pool ──USDT──▶ Kid wallet
                     │                                     │
                     ├─ review_repo: reads GitHub commits  └─ REJECT / HOLD_FOR_PARENT
                     └─ propose_milestone: drafts new milestones → parent approves on dashboard
```

- The LLM has **no send tool and no keys**. Prompt-injecting it moves nothing.
- New milestones are **agent-drafted, parent-approved** — the agent explains what
  the kid will learn and why it matters; parents decide without technical knowledge.
- Every proposal → decision → transfer is **audit-logged** and visible on the dashboard.

## What actually runs (verified)

- Sepolia testnet · MockUSDT `0x4804e2dad314454739600cf4be3b8290427ed4b4`
- Live transfers verified: treasury → pool → kid wallet
- Client-side key generation verified byte-for-byte against WDK SDK derivation
- 10/10 policy-engine tests · full audit trail in `data/audit.log`

## Honest limits

- Demo wizard's project pool is platform-held (functional escrow). Production
  upgrade: swap for an on-chain escrow contract to make the guarantee
  cryptographic ([ROADMAP.md](ROADMAP.md))
- Standard EOA transfers need native gas → roadmap: WDK ERC-4337 gasless modules,
  fees settle in USDT ([ROADMAP.md](ROADMAP.md))
- Testnet USDT only → mainnet USDT is the same code path, network config flipped

## Explore

- Landing: `/` · ELI5 picture-book: `/eli5` · Kid chat: `/chat` · Parent dashboard: `/parent` · Project page: `/fund`
- Deep-dive FAQ on the landing bottom · Full diagrams: [docs/ARCHITECTURE.md](ARCHITECTURE.md)
