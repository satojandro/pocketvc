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

## Production architecture (the fix, already planned)

In production, wallet generation moves **client-side**:

1. The browser (or device) generates keys via the WDK SDK running locally —
   the server never sees seed phrases or passphrases.
2. The server only ever receives **public addresses** to register on the
   milestone contract.
3. Signing happens on the user's device; the server relays signed
   transactions it cannot forge.

This preserves the core promise — keys generated on the family's device,
never on a server — which the demo honors in spirit (keys are generated
locally on the runner machine) and production will honor in letter.

## Disclosure

This note is referenced from the setup wizard code
(`web/src/app/api/wallet/create/route.ts`) and exists so judges and
contributors can evaluate the custody story honestly.
