# BabyShark VC — Setup Guide

Everything needed to run the project from a clean clone.

## Prerequisites (install once)

| Tool | Version | Why | Install |
|---|---|---|---|
| **Node.js** | ≥ 22.18 | runtime for everything | https://nodejs.org (or `brew install node`) |
| **npm** | ≥ 10 | package manager (ships with Node) | — |
| **Foundry** *(only for contract deployment)* | latest | compile/deploy Solidity | `curl -L https://foundry.paradigm.xyz \| bash && foundryup` |
| **WDK CLI** *(only if creating new wallets)* | 1.0.0-beta.3 | self-custodial wallets | installed via npm below |

> **Note:** you do NOT need Foundry to *run* BabyShark. It's only needed to redeploy
> MockUSDT to a fresh chain/network. The token is already deployed on Sepolia:
> `0x4804e2dad314454739600cf4be3b8290427ed4b4`

## Install & run

```bash
git clone https://github.com/satojandro/pocketvc.git babyshark
cd babyshark
npm install        # installs ALL project dependencies (package.json)
cp .env.example .env   # then fill in the values (see below)
```

That's it — `npm install` handles everything else. No global installs required.

## Configure `.env`

```
# LLM (required) — any OpenAI-compatible endpoint works
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=openai/gpt-4o-mini
LLM_API_KEY=sk-or-...        # your OpenRouter key: https://openrouter.ai/keys

# Wallets (for real payouts)
TREASURY_ADDRESS=0x...       # parent treasury wallet address
KID_ADDRESS=0x...            # kid wallet address

# Policy
PARENT_CONFIRM_THRESHOLD=25  # USDT payouts above this need parent OK

# Only needed to deploy contracts yourself (skip otherwise):
DEPLOYER_PRIVATE_KEY=0x...
```

## Creating wallets (parent + kid)

```bash
npx wdk wallet create --name treasury   # generates seed + passphrase prompt
npx wdk wallet unlock --name treasury --ttl 120
npx wdk get address --wallet treasury --network sepolia

npx wdk wallet create --name kid
npx wdk wallet unlock --name kid --ttl 120
npx wdk get address --wallet kid --network sepolia
```

Fund treasury with Sepolia ETH (any faucet) + testnet USDT (see below), then:

```bash
npx wdk send --network sepolia --wallet treasury --to <KID_ADDRESS> \
  --token usdt-test --amount 1 --json   # test transfer
```

## Run

```bash
npm run chat     # terminal session with BabyShark 🦈
npm test         # policy engine tests
```

## Deploying your own MockUSDT (optional)

```bash
export PATH="$HOME/.foundry/bin:$PATH"
forge install  # first time only
forge script script/DeployMockUSDT.s.sol \
  --rpc-url https://ethereum-sepolia-rpc.publicnode.com --broadcast
```

## What changes when the web UI lands?

Nothing structural. Same `.env`, same `npm install` — we add Next.js as a
project dependency and a `npm run dev` script. The agent core (`src/agent`,
`src/policy`) is UI-agnostic by design.
