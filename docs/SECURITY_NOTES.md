# Security Notes — Wallet Custody Model

**Status: keys are generated client-side. The server never sees seed material for the treasury or kid wallets.**

## How each wallet's keys are handled

| Wallet | Key generation | Who holds keys | Server access |
|---|---|---|---|
| Treasury | Browser (setup wizard, `@scure/bip39` + BIP-44) | Parent only | None — address registered only |
| Kid wallet | Browser (same flow) | Kid only | None — address registered only |
| Project pool | Server (WDK CLI) | Platform (passphrase in server env) | Full — by design |

The treasury and kid wallets are fully self-custodial: keys are generated
in-browser during setup and never transmitted. The server registers only their
public addresses.

The **project pool** is intentionally different: it is platform-held so that
committed + crowdfunded funds sit in a wallet no family member can raid. The
only exit path is a policy-approved payout to the kid's pinned address. This is
a functional escrow — the same custody model GoFundMe uses for campaign funds.

## Verification

Client-side derivation was verified byte-for-byte against the WDK SDK itself
(`@tetherto/wdk-wallet-evm`, same BIP-44 path, same keccak):
see `web/scripts/verify-derivation.mjs`.

## Signing (demo vs production)

Demo payouts are signed by the pool wallet via the WDK CLI daemon running on
the deployment machine (passphrase-gated, TTL-limited sessions). In production,
signing moves fully client-side: WDK's `WalletAccountEvm` signs in the browser
and the app broadcasts the raw transaction — the SDK interface is identical,
as proven by the derivation test.

## Production escrow upgrade

The current pool is a functional escrow (procedural guarantee). The production
upgrade replaces it with an on-chain escrow contract (cryptographic guarantee):
deposits land in a per-project contract that can only release via verified
milestone payouts. See [ROADMAP.md](ROADMAP.md) for details.
