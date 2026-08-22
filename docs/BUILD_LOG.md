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
- Fund treasury: Sepolia ETH (faucet) + test USDT (deploy mock ERC-20 or find Candide testnet USDT).
- First treasury→kid transfer with `--json` receipt.
- Then Phase 1: policy engine.
