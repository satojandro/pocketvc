# BabyShark VC 🦈👶

**An AI mentor-investor that reviews kids' coding work and pays out USDT when milestones are hit.**

## Why

Parents want their kids to build things with AI and code — but most parents can't evaluate the work. The kid has nobody who *understands* what they built, so daily show-and-tell dies, and slacking ("yeah dad, I worked on it") goes undetected.

PocketVC fills that gap: an AI mentor that actually reads the repo, gets genuinely curious about what the kid built, coaches them between milestones — and when a milestone is done, releases real money from the parent's treasury to the kid's own self-custodial wallet.

> The parent sets the budget. The AI judges the work. Code bounds the payout.
> **The AI decides *who deserves* the reward; deterministic code decides *how much can move*.**

Not hostile like Shark Tank — a supportive coach who happens to hold the checkbook. The goal: the kid *wants* to show their work, because finally someone gets it.

## How it works

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full system map.

```
Kid ──pitch──▶ Shark Agent (LLM reasoning)
                    │ propose_payout()
                    ▼
              Policy Engine (deterministic caps & checks)
                    │ approved
                    ▼
              WDK wallet layer (@tetherto/wdk-cli)
              treasury (parent) ──USDT──▶ kid wallet (self-custodial)
```

- **Shark Agent** — LLM (Vercel AI SDK): reviews commits/diffs via GitHub API, asks curiosity-driven questions, mentors between milestones, renders verdicts. Has NO send-money tool — only `propose_payout()`.
- **Policy Engine** — plain TypeScript, zero AI: enforces milestone budgets, duplicate-payout protection, recipient binding, parent-confirm thresholds. Logs every decision.
- **Wallet layer** — `@tetherto/wdk-cli`: two self-custodial wallets (treasury + kid), `--json` receipt trail.

## Status

Hackathon build for [Aleph Hackathon 2026](https://hacki.crecimiento.build/h/aleph-hackathon-2026), Tether WDK Track. Running log: [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md).

| Layer | Status |
|---|---|
| Wallet spine (Phase 0) | ✅ working end-to-end on Sepolia |
| Policy engine (Phase 1) | 🚧 in progress |
| Agent loop (Phase 2) | ⏳ |
| Repo review (Phase 3) | ⏳ |

## WDK packages used

- `@tetherto/wdk-cli@1.0.0-beta.3` — local self-custodial wallets, transfers, JSON receipts
