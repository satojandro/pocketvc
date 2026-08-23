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

### Gasless first payment (WDK gasless modules)
A brand-new kid wallet holds zero native gas. WDK's gasless modules
(ERC-4337 / EIP-7702 paymasters, fees settled in USDT) make the first reward
land without the "go get gas first" dead-end.

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
