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
