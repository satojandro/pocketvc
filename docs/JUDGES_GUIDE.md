# BabyShark VC — Judge's Guide

**One-pager for reviewers. Everything else in `docs/` expands on this.**

## The idea
An AI mentor-investor for kids who code. Parents commit USDT to clear milestones.
An AI coach reads every commit, teaches daily, verifies progress, and releases
the money only when work checks out — into the kid's own self-custodial wallet.

**The rule that defines us:** the AI decides *who deserves* the reward;
deterministic code decides *how much can move*.

## How WDK is incorporated (not bolted on)

| WDK surface | Where | Why meaningful |
|---|---|---|
| `@tetherto/wdk-cli` — wallet create/unlock/daemon | Family setup + payout execution | Self-custodial keys generated & stored on-device; passphrase-gated sessions |
| `wdk get address/balance` | Dashboard + agent tools | Live balances drive policy checks |
| `wdk send --json` | Payout execution (`web/src/lib/wallet-exec.ts`) | On-chain USDT transfers with machine-readable receipts |
| Token registry (`usdt-test`) | Payout token config | MockUSDT behaves identically to real USDT |
| MoonPay fiat module (`wdk buy`) | Roadmap: card→USDT top-ups | Parents fund treasuries without touching exchanges |

**Key permalinks:**
- Payout gateway (the only money path): [`web/src/lib/wallet-exec.ts`](../web/src/lib/wallet-exec.ts)
- Agent's propose-only tool: [`web/src/lib/tools.ts`](../web/src/lib/tools.ts) → `propose_payout`
- Policy engine (no AI, unit-tested): [`src/policy/engine.ts`](../src/policy/engine.ts)

## Architecture in 15 seconds

```
Kid pitches ──▶ Shark Agent (LLM) ──propose_payout()──▶ Policy Engine ──APPROVE──▶ wdk send
                     │                                     │
                     └─ reads GitHub commits, coaches      └─ REJECT / HOLD_FOR_PARENT
```

- The LLM has **no send tool and no keys**. Prompt-injecting it moves nothing.
- Milestones are **parent-approved** (agent drafts proposals with learning outcomes;
  parent approves on dashboard).
- Every proposal → decision → transfer is **audit-logged** and visible on the dashboard.

## What actually runs (verified)

- Sepolia testnet · MockUSDT `0x4804e2dad314454739600cf4be3b8290427ed4b4`
- Live transfers: treasury `0x5e31…32AdC` → kid `0xC413…b255`
- Client-side key generation verified against WDK SDK derivation
- 10/10 policy-engine tests · full audit trail in `data/audit.log`

## Honest limits (and fixes)

- Demo wizard drives WDK CLI server-side for ergonomics → production generates keys client-side via WDK SDK ([SECURITY_NOTES.md](SECURITY_NOTES.md))
- Standard EOA transfers need native gas → roadmap: WDK ERC-4337 gasless modules (fees settle in USDT) ([ROADMAP.md](ROADMAP.md))
- Testnet USDT only → mainnet USDT is the same code path, network config flipped

## Explore

- Landing: `/` · ELI5 picture-book: `/eli5` · Kid chat: `/chat` · Parent dashboard: `/parent` · Project page: `/fund`
- Deep-dive FAQ on the landing bottom · Full diagrams: [docs/ARCHITECTURE.md](ARCHITECTURE.md)
