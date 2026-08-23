# Security Notes — Wallet Setup Wizard

## Current implementation (hackathon demo)

The `/setup` wizard creates wallets by invoking `@tetherto/wdk-cli` on the
server. Two implementation details to be transparent about:

### 1. The passphrase transits the server

The WDK CLI requires interactive passphrase input, so the server route feeds
the passphrase to the CLI process. The passphrase comes from server
environment config (`WALLET_PASSPHRASE`), not from the browser.

**Why this is acceptable for the demo:** the passphrase is a demo-only value,
wallets hold testnet-only funds, and the server is the family's own machine
in the reference deployment.

**Why it would NOT be acceptable in production:** a server that knows a
wallet's passphrase could derive its keys. That contradicts the
self-custodial promise.

### 2. The TTY workaround

The CLI's prompts expect a terminal (TTY). The server route spawns the CLI
with piped stdio and retries passphrase submission on a timer. This is a
workaround for demo ergonomics, documented in the code.

## Status: RESOLVED — client-side generation shipped

As of commit `1fea531`, wallet generation in the setup wizard is fully
client-side:

1. The mnemonic is generated **in the browser** using audited BIP-39 libs
   (`@scure/bip39`).
2. The address is derived **locally** via BIP-44 (`m/44'/60'/0'/0/0`) —
   verified byte-for-byte against `@tetherto/wdk-wallet-evm` itself
   (see `web/scripts/verify-derivation.mjs`).
3. The server receives **only the public address**, which it registers.
   No seed phrase or passphrase ever transits the network.

Signing for demo payouts still runs through the WDK CLI daemon server-side
(the parent's treasury is a demo wallet). In production, signing moves
client-side too: WDK's `WalletAccountEvm` signs locally and the app
broadcasts the raw transaction — the interface is identical, as proven by
the derivation test.

## Disclosure

This note is referenced from the setup wizard code
(`web/src/app/api/wallet/create/route.ts`) and exists so judges and
contributors can evaluate the custody story honestly.
