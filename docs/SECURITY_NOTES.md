# Security Notes — Wallet Setup Wizard

**Status: keys are generated client-side. The server never sees seed material.**

The setup wizard generates mnemonics in the browser using audited BIP-39 libs
(`@scure/bip39`) and derives addresses locally via BIP-44 — the same standards
and derivation path the WDK SDK implements (verified byte-for-byte against
`@tetherto/wdk-wallet-evm`, see `web/scripts/verify-derivation.mjs`). The server
receives only public addresses and rejects anything else.

## Historical note (pre-fix demo state)

An earlier iteration created wallets server-side by driving the WDK CLI with a
server-held passphrase. That was replaced by the client-side flow above; this
section is retained for transparency.

## Signing (demo vs production)

Demo payouts are signed by the parent's treasury wallet via the WDK CLI daemon
running on the family's own machine (passphrase-gated, TTL-limited sessions).
In production, signing moves fully client-side too: WDK's `WalletAccountEvm`
signs in the browser/device and the app broadcasts the raw transaction — the
SDK interface is identical, as proven by the derivation test.
