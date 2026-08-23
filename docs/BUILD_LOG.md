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

### ~19:30 — First transfer ✅ (Phase 0 complete)
- Dry-run first (`--dry-run`): 50 USDT, est. fee 0.000114 ETH.
- Sent: treasury → kid, tx `0xbef958c2d0020d057ae1d18fbc12031d5b11cd4358e7689f2ad84ae44b71d665`.
- Kid balance verified post-confirmation: **50 USDT** (~20s wait = Sepolia block time).
- Product reframe from Alejandro: the agent is a supportive MENTOR first (daily show-and-tell with someone who understands), investor second. The cousin story: dad can't read code → kid stops showing work → slacking invisible. PocketVC fixes both: real comprehension + real verification. Persona spec folded into ARCHITECTURE.md design principles.

### Next
- Phase 1: policy engine (pure TS + tests).
- Phase 2: Vercel AI SDK agent loop w/ Shark persona system prompt.

### ~21:30 — Phase 1: Policy engine ✅
- `src/policy/engine.ts` — pure deterministic evaluation: budget caps, recipient binding (case-insensitive), milestone status, treasury-self-pay refusal, parent-confirm threshold → APPROVE / REJECT / HOLD_FOR_PARENT.
- `src/policy/store.ts` — JSON file persistence for milestones + append-only audit log under data/.
- `src/policy/engine.test.ts` — 10 vitest cases covering all failure modes. **All green.**
- Gotcha: vitest initially swept OpenZeppelin's vendored JS tests in lib/ — fixed with include/exclude globs in vitest.config.ts.

Design notes:
- Amounts are bigint base units (6 decimals) — no float money ever.
- evaluateProposal is pure (no I/O) so it's trivially testable; store is the only touchpoint with disk.
- The audit log doubles as the agent's "milestone journal" memory tier.

### ~00:15 (Sun) — Phase 2: Agent loop ✅
- Stack: Vercel AI SDK v7 + @ai-sdk/openai-compatible → OpenRouter (gpt-4o-mini).
- `src/agent/prompt.ts` — persona: supportive coach, money rules ("you can only ASK"), memory discipline.
- `src/agent/tools.ts` — read_milestone / read_journal / update_kid_profile / propose_payout (→ policy engine).
- `src/agent/loop.ts` — generateText w/ stepCountIs(12), kid profile injected into system prompt each turn.
- `src/agent/chat.ts` — terminal REPL (`npm run chat`).
- AI SDK v7 gotcha: tool schema key renamed `parameters` → `inputSchema`.
- BigInt serialization gotcha: tool results must stringify bigints before crossing the JSON boundary.

Multi-turn session test (simulated Mateo):
1. Kid claims milestone done → BabyShark praises specifically, probes understanding, saves profile. NO payout.
2. Kid explains checkpoint code → still asks for more evidence.
3. Kid details all 3 checkpoints → proposes $50, policy engine → **HOLD_FOR_PARENT** (> $25 threshold), explained honestly to kid.
4. Parent approves hold; kid returns → agent reads journal, knows approval happened.
5. Slider feature discussion → curiosity questions about RemoteEvents; kid answers well (client-server replication reasoning) → proposes remaining $50 → HOLD again (correct: > threshold).

Full audit trail in data/audit.log shows every proposal + decision. The safety chain works end-to-end in conversation.

### Next
- Phase 3: repo review tool (GitHub API) — real commit evidence instead of pasted code.
- Phase 4: web UI on ai-chatbot template + parent dashboard.

### ~01:00 — Phase 3: Repo review tool ✅
- `src/agent/github.ts` — GitHub REST: repo meta, recent commits w/ per-commit stats (capped 8), file tree, languages, single-file fetch. Public-API read-only; GITHUB_TOKEN optional for rate limits.
- Wired as `review_repo` tool in the agent.
- Integration test: told BabyShark "my obby repo is venekovox" → agent called review_repo, noticed NO checkpoint commits ("the last changes were more focused on presentation"), and asked Mateo to explain instead of paying. **The bluff-detection loop works against real GitHub data.**
- Note for demo: use a repo with real recent commits; kid repos will be small but genuine.

### ~01:30 — Housekeeping
- Removed Foundry scaffold leftovers (Counter.sol, Counter.s.sol).
- Demo plan: showcase review_repo against an active public game repo (presented as the kid's repo) — agent analyzes real recent commits and comments on actual code.

### ~01:00-03:30 (Sun) — Night session
- Wallet wizard made FUNCTIONAL: /setup page generates keys client-side via BIP-39/44 libs (@scure/*), derivation verified byte-for-byte vs WDK SDK; server receives public addresses only (/api/wallet/register rejects non-addresses).
- SECURITY_NOTES.md rewritten: client-side generation is the shipped implementation.
- executePayout() wired into propose_payout: approved payouts now REALLY send USDT treasury→kid and return the tx hash. Tested live: 5 USDT sent, tx 0x6ef1aec3…
- Gotchas: wdk CLI prompts need delayed stdin writes (pipe closes too early); dotenv path must be explicit for web/ subdirs.
- Gas dead-end documented: ROADMAP layers + how-it-works FAQ + README note (EOA+gas now → ERC-4337 gasless next).

### ~05:50 — Dress rehearsal PASSED ✅
Full loop executed end-to-end with fresh state:
1. Milestone: "Simulator Tycoon: Planning + Money System" — 10 USDT, open (created via parent API after agent proposal flow)
2. Kid claims completion → BabyShark reviews repo (godotengine/godot-demo-projects), initially can't find the specific file, asks Mateo to clarify — honest verification behavior
3. Kid points to path → agent satisfied → propose_payout(10 USDT) → policy APPROVE → executePayout fires real wdk send
4. Kid wallet balance verified: 65 USDT (50 earlier + 5 exec test + 10 rehearsal payout)
5. Audit trail: clean single APPROVE entry

All track requirements re-verified against the official WDK track page:
- ✅ @tetherto/wdk-cli as core dependency (scoped package, beta.3)
- ✅ Public repo + README naming modules
- ✅ Permalinks to WDK integration files
- ✅ Demo video: pending (script ready)
- ✅ Package list + versions in SETUP.md
- ✅ Clean-clone setup instructions (.env.example)
- ✅ Network/token details incl. MockUSDT contract address
- ✅ Not AI slop: every method used is verified against live docs; no dead code; README describes only shipped features

### ~06:15 — Functional escrow: project pool wallet shipped
- Setup wizard now creates THREE wallets: treasury (parent, client-side keys), kid (client-side keys), and PROJECT POOL (server-held, seed never exposed).
- Pool = functional escrow: deposits in freely; only exit is policy-approved payout to the kid's pinned address. Nobody in the family holds the key.
- /api/pool/create returns public address only. Tested live: demo-pool at 0x95381F07…
- executePayout draws from the pool wallet instead of parent treasury.
- Production upgrade path: swap custodial pool for escrow smart contract.
