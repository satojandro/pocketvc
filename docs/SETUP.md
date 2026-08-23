# BabyShark VC — Setup Guide

Everything needed to run the project from a clean clone.

## Prerequisites (install once)

| Tool | Version | Why | Install |
|---|---|---|---|
| **Node.js** | ≥ 22.18 | runtime for everything | https://nodejs.org (or `brew install node`) |
| **npm** | ≥ 10 | package manager (ships with Node) | — |
| **Foundry** *(only for contract deployment)* | latest | compile/deploy Solidity | `curl -L https://foundry.paradigm.xyz \| bash && foundryup` |

> You do NOT need Foundry to *run* BabyShark. It's only needed to redeploy
> MockUSDT. The token is already deployed on Sepolia:
> `0x4804e2dad314454739600cf4be3b8290427ed4b4`

## Install & run

```bash
git clone https://github.com/satojandro/pocketvc.git babyshark
cd babyshark/web
npm install        # installs ALL dependencies (incl. WDK SDK + CLI)
cp ../.env.example .env.local   # then fill in values (see below)
npm run dev        # http://localhost:3000
```

## Configure `.env.local`

```
# LLM (required) — any OpenAI-compatible endpoint
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=openai/gpt-4o-mini
LLM_API_KEY=sk-or-...        # https://openrouter.ai/keys

# Wallets (payout source + destination)
KID_ADDRESS=0x...
TREASURY_ADDRESS=0x...

# Policy: USDT payouts above this need parent confirmation
PARENT_CONFIRM_THRESHOLD=25

# Wallet passphrase used by server-held pool wallet ops
WALLET_PASSPHRASE=testpassphrase123
```

## WDK packages installed

Both install via `npm install` at the repo root / web dir:

| Package | Version | Used for |
|---|---|---|
| `@tetherto/wdk-cli` | 1.0.0-beta.3 | Wallet CLI: create/unlock/daemon, address derivation, balances, USDT transfers, token registry |
| `@tetherto/wdk-wallet-evm` | 1.0.0-beta.17 | Client-side key generation in setup wizard |

## Creating wallets

### Via setup wizard (recommended)
Visit `/setup` in the running app. Creates all three wallets:
- Treasury (parent) — keys generated client-side
- Kid wallet — keys generated client-side
- Project pool — created server-side (functional escrow; seed never exposed)

### Via WDK CLI (alternative)
```bash
npx wdk wallet create --name treasury    # passphrase prompt ×2
npx wdk wallet unlock --name treasury --ttl 120
npx wdk get address --wallet treasury --network sepolia
```

## Funding the treasury

1. Get Sepolia ETH from any faucet → treasury address
2. Testnet USDT: transfer from our MockUSDT (`wdk send --token usdt-test`) or acquire via Candide/Pimlico faucets

Test payout:
```bash
npx wdk send --network sepolia --wallet treasury --to <KID_ADDRESS> \
  --token usdt-test --amount 1 --json
```

## Deploying your own MockUSDT (optional)

```bash
export PATH="$HOME/.foundry/bin:$PATH"
forge script script/DeployMockUSDT.s.sol \
  --rpc-url https://ethereum-sepolia-rpc.publicnode.com --broadcast
```
Set `DEPLOYER_PRIVATE_KEY` and `TREASURY_ADDRESS` in `.env` first.

## Verify everything works

```bash
npm test          # policy engine: 10 tests
curl http://localhost:3000/api/dashboard   # should return milestone JSON
```

Then open `/chat`, talk to BabyShark, and watch the payout flow on `/parent`.
