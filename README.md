# BabyShark VC 🦈👶

**An AI mentor-investor that reviews kids' coding work and pays out USDT when milestones are hit.**

## Why

Parents want their kids to build things with code — but most parents can't evaluate the work. The kid has nobody who *understands* what they built, so daily show-and-tell dies, and slacking ("yeah dad, I worked on it") goes undetected.

BabyShark fills that gap: an AI mentor that actually reads the repo, gets genuinely curious about what the kid built, coaches them between milestones — and when a milestone is done, releases real money from the parent's treasury to the kid's own self-custodial wallet.

> The parent sets the budget. The AI judges the work. Code bounds the payout.
> **The AI decides *who deserves* the reward; deterministic code decides *how much can move*.**

Not hostile like Shark Tank — a supportive coach who happens to hold the checkbook. The goal: the kid *wants* to show their work, because finally someone gets it.

## How it works

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full system map (two diagrams: system flow + agent anatomy).

```
Kid ──pitch──▶ BabyShark Agent (LLM reasoning)
                    │ propose_payout()
                    ▼
              Policy Engine (deterministic caps & checks — no AI)
                    │ approved
                    ▼
              WDK wallet layer (@tetherto/wdk-cli)
              treasury (parent) ──USDT──▶ kid wallet (self-custodial)
```

- **BabyShark Agent** — LLM via [Vercel AI SDK](https://sdk.vercel.ai): reviews commits/diffs through the GitHub API (`review_repo`), asks curiosity-driven questions, mentors between milestones with persistent memory of the kid, renders verdicts. Has **no send-money tool** — only `propose_payout()`, a request the policy engine can reject.
- **Policy Engine** — plain TypeScript, zero AI: enforces milestone budgets, duplicate-payout protection, recipient binding, parent-confirm thresholds, treasury-self-pay refusal. Every proposal/decision logged to an append-only audit file.
- **Wallet layer** — [`@tetherto/wdk-cli`](https://docs.wdk.tether.io): two self-custodial wallets (treasury + kid), ERC-20 USDT transfers, `--json` receipt trail. Keys never leave the machine; the LLM never sees them.
- **Memory** — three tiers: session history (chat storage), kid profile (`data/kid.json`, agent-updated via tool), milestone journal (reuses the policy audit log). Injected into every prompt: "Welcome back — yesterday the checkpoints stumped you."

## What's demonstrably working

- ✅ End-to-end payout chain on Sepolia: MockUSDT contract deployed ([`0x4804…ed4b4`](https://sepolia.etherscan.io/address/0x4804e2dad314454739600cf4be3b8290427ed4b4)), treasury → kid transfer confirmed
- ✅ Multi-turn agent session: kid claims milestone → BabyShark praises specifically, probes understanding, proposes $50 → **policy engine holds it for parent confirmation** → explained honestly to the kid → second feature proposed after approval
- ✅ Bluff detection against real GitHub data: agent reviewed a repo with no checkpoint commits and asked the kid to explain instead of paying
- ✅ 10 unit tests on the policy engine; full audit trail in `data/audit.log`

## Repo map

| Path | What |
|---|---|
| `contracts/MockUSDT.sol` | Test-only ERC-20 stand-in (OZ inheritance, 6 decimals) |
| `script/DeployMockUSDT.s.sol` | Foundry deploy script |
| `src/policy/engine.ts` | The money rules (pure functions, no AI) + tests |
| `src/policy/store.ts` | Milestone store + append-only audit log |
| `src/agent/prompt.ts` | BabyShark persona (coach-first, money rules, memory discipline) |
| `src/agent/tools.ts` | The ONLY actions the LLM can take — incl. the single payout gateway |
| `src/agent/github.ts` | GitHub repo review (commits, diffs, tree, languages) |
| `src/agent/loop.ts` / `chat.ts` | AI SDK loop + terminal REPL |
| `docs/ARCHITECTURE.md` | System map + agent anatomy diagrams |
| `docs/BUILD_LOG.md` | Full build narrative w/ gotchas |
| `docs/SETUP.md` | Clean-clone setup guide |

## Run it

```bash
git clone https://github.com/satojandro/pocketvc.git && cd pocketvc
npm install
cp .env.example .env   # add an OpenRouter key + wallet addresses
npm run chat           # talk to BabyShark 🦈
npm test               # policy engine tests
```

Full setup (wallets, faucets, optional contract deploy): [`docs/SETUP.md`](docs/SETUP.md).

## WDK packages used (Aleph Track requirement)

- `@tetherto/wdk-cli@1.0.0-beta.3` — wallet creation/unlock daemon, address derivation & balances, ERC-20 sends with JSON receipts, token registry

Permalinks to WDK integration:
- Payout execution boundary: `src/agent/tools.ts` → `propose_payout` (policy-approved amounts are dispatched to the wallet layer)
- Wallet operations: see `docs/BUILD_LOG.md` Phase 0 (wallet create/unlock/get/send transcripts)

## Roadmap

The weekend proves the loop; [docs/ROADMAP.md](docs/ROADMAP.md) is the product:
one-click WDK wallet setup, MoonPay card→USDT on-ramp, anyone-can-deposit QR
crowdfunding for kids' projects, gasless first payments, subgraph indexing.

## Built for

[Aleph Hackathon 2026](https://hacki.crecimiento.build/h/aleph-hackathon-2026) — Tether WDK Track, Aug 22–23. Team: Alejandro Avellaneda.
