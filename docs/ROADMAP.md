# BabyShark VC — Roadmap

What exists today vs. where this goes. The hackathon build proves the core loop;
this is the product it becomes.

## Shipped at Aleph 2026 (the weekend)

- Self-custodial treasury + kid wallets via `@tetherto/wdk-cli` (keys never leave the family machine)
- MockUSDT milestone payouts on Sepolia, policy-gated, audit-logged
- AI mentor-investor: repo review via GitHub API, coaching with memory, verdicts
- Deterministic policy engine (no-AI money rules) + parent confirmation thresholds
- Web app: landing, kid chat with live tool-activity chips, parent dashboard + QR deposits

## Next up — deepening the WDK integration

### Account creation = wallet creation (one-click wizard)
BabyShark has no passwords — the WDK wallet IS the account. A setup wizard
button drives WDK wallet creation from the web app: parent passphrase flow,
encrypted keystore saved locally, treasury + kid addresses registered, done.
The family's first login is the moment they own their keys.

### Fiat on-ramp: dollars → USDT with a credit card
WDK ships a MoonPay fiat module (`wdk buy --fiat-amount 100 --token usdt`).
Parents and relatives add funds with a card; MoonPay converts to USDT straight
into the treasury. Needs a MoonPay API key + signing URL configured — the code
path already exists in the CLI.

### Anyone-can-deposit crowdfunding (QR)
The dashboard's QR encodes the project treasury address — scan with any wallet
to back a kid's project. Production version adds a per-project escrow contract:
deposits accrue publicly on-chain, released only via policy-approved payouts,
so backers can see exactly how "their" kid's funding was spent.

**Two-layer treasury model (production):**
- **Project pool (escrow contract):** all commitments + crowdfunding deposits
  land here. This defines what the agent has available to disperse. Money in
  the pool is cryptographically segregated — it can ONLY move out through
  policy-approved milestone payouts.
- **Parent treasury wallet:** the parent's own funds, held self-custodially.
  Commitments transfer parent-wallet → pool at commitment time.

Demo note: tonight both roles are played by one WDK wallet ("treasury") with
the milestone budgets acting as accounting-level caps. The escrow contract is
the production upgrade that makes the segregation cryptographic.

### Gasless everything — killing the gas dead-end (next up)
A brand-new wallet holds zero native gas. Receiving USDT is free, but *sending*
it normally needs the chain's native token — a new family would hit a wall the
first time a payout fires. Fix, in layers:

1. **On-ramp bundles gas**: MoonPay top-ups deliver USDT + a little native gas
   in one card purchase — parents never see the concept.
2. **WDK gasless modules** (`wdk-wallet-evm-erc-4337`): an ERC-4337 paymaster
   accepts USDT as the fee itself — wallets hold *zero* native gas, ever.
   Testnet USD₮ via Candide/Pimlico is supported on Sepolia; the module is
   already in WDK's network registry (`smart-account-sepolia`).
3. **Chain choice**: deploy on Plasma or Stable — purpose-built for USD₮ —
   making the problem structurally disappear.

Because payout execution is isolated in one wallet-layer file, this upgrade
doesn't touch the agent or the policy engine.

## Then

- **Session sidebar & accounts** — one chat thread per day per kid; real auth for parent/kid roles
- **Kid onboarding conversation** — BabyShark's first session asks: what's your project? repo? goal? experience level? → seeds the milestone contract
- **Subgraph indexing** — dashboard reads on-chain treasury/payout history via The Graph instead of local logs
- **Multi-milestone projects** — full roadmap view per project, streaks, escalating bounties
- **x402 machine payments** — the kid's agent pays for APIs/services from its own earnings (the agent economy endgame)

## The long game

Replace the chore chart. A kid who mows lawns for $20 learns work ethic.
A kid who ships software for USDT learns work ethic *and* engineering *and*
self-custody — with receipts nobody can dispute, in money nobody can take.
