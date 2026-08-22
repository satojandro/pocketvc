# Build Log — PocketVC @ Aleph Hackathon 2026

All times in Bolivia (BOT = UTC-4). Deadline: Sunday Aug 23, 11:00 BOT.

## Saturday

### ~12:00 — Phase 0: Wallet spine
- Repo scaffolded at ~/Projects/pocketvc on the Mac Mini.
- `@tetherto/wdk-cli@1.0.0-beta.3` installed (scoped package; unscoped `wdk-cli` on npm is a different project — trap noted in track rules).
- Created two passphrase-encrypted test wallets via CLI (interactive prompts driven over PTY):
  - `treasury` (parent): `0x5e311e1A9147bc4750F53b6f23b0753450b32AdC` (Sepolia index 0)
  - `kid`: `0xC413707F12C1a08bFc8Dc6cD091bF69762B2b255` (Sepolia index 0)
- Both wallets unlock via `wdk wallet unlock` → background daemon session (TTL).
- `wdk get address` / `wdk get balance` verified end-to-end (both 0 balance).
- Testnet networks available out of the box: sepolia, solana-devnet, tron-testnet, bitcoin-testnet3, spark-regtest, smart-account-sepolia.

### Next
- Fund treasury: ✅ Sepolia ETH via faucet (0.1 ETH).

### ~13:30 — Mock USDT deployment
- Created third wallet `deployer` (`0x18af62D30b6072cE249dB2EC6D7376d6e6fa9b22`) — separation of duties: deployer pays gas, treasury holds funds, kid receives.
- Installed Foundry (forge/cast 1.7.1) + OpenZeppelin contracts (vendored in lib/).
- `contracts/MockUSDT.sol`: OZ ERC20 inheritance only; 6 decimals; mints 1M to treasury in constructor.
- Deployed: forge script broadcast to Sepolia via publicnode RPC.
  - **MockUSDT: 0x4804e2dad314454739600cf4be3b8290427ed4b4**
- Registered in wdk token registry as `usdt-test` (registry edit requires default-wallet passphrase confirm).
- Verified: `wdk get balance --wallet treasury --token usdt-test` → 1,000,000 USDT ✓ (WDK read agrees with Foundry deployment — independent-stack check).

Gotchas:
- `forge script --rpc-url sepolia` failed ("Internal transport error") — no built-in sepolia alias; pass an explicit RPC URL.
- Sepolia has built-in registry entry "usdt" pointing at a different address (0xd077...) — ours is registered separately as `usdt-test`. For the demo we use ours.

### Next
- First transfer: treasury → kid via wdk send.
- Phase 1: policy engine.
