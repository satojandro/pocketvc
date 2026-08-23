/**
 * Wallet execution layer — the ONLY place where money actually moves.
 * Draws from the PROJECT POOL (platform-held escrow), never the parent's
 * personal treasury. Called after policy-engine approval; never exposed to
 * the LLM.
 *
 * Implementation note: the WDK CLI's masked prompts require delayed writes
 * (a bare pipe closes too early), so we spawn with timed stdin writes.
 */
import { spawn } from "node:child_process";
import { join } from "node:path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const WDK = join(process.cwd(), "..", "node_modules", ".bin", "wdk");
const PASSPHRASE = process.env.WALLET_PASSPHRASE ?? "";

function wdkCli(args: string, input: string, successMarker = ""): Promise<string> {
  return new Promise((resolve) => {
    const p = spawn(WDK, args.split(" "), { cwd: process.cwd() });
    let out = "";
    let writes = 0;
    p.stdout.on("data", (d) => { out += d; if (successMarker && out.includes(successMarker)) finish(); });
    p.stderr.on("data", (d) => (out += d));
    const iv = setInterval(() => {
      if (writes < 6 && !out.includes(successMarker)) {
        try { p.stdin.write(input + "\n"); writes++; } catch {}
      } else { try { p.stdin.end(); } catch {} }
    }, 2000);
    const t = setTimeout(() => { try { p.kill(); } catch {} }, 120000);
    function finish() { clearInterval(iv); clearTimeout(t); resolve(out); }
    p.on("close", () => { clearInterval(iv); clearTimeout(t); resolve(out); });
  });
}

/** Ensure a wallet's daemon session is unlocked before sending. */
export async function ensureUnlocked(wallet: string): Promise<void> {
  const out = await wdkCli(`wallet unlock --name ${wallet} --ttl 30 --json`, PASSPHRASE, '"unlocked":true');
  if (!out.includes('"unlocked":true')) throw new Error(`unlock failed: ${out.slice(-200)}`);
}

export interface SendResult {
  txHash: string;
  from?: string;
  to?: string;
  amount?: string;
}

/**
 * Execute an approved USDT payout pool → kid address.
 * `fromWallet` is the project pool wallet name (e.g. "avellaneda-pool").
 * Returns the on-chain tx hash.
 */
const SIMULATE = process.env.DEMO_MODE === "true";

export async function executePayout(
  amountUsdt: number,
  toAddress: string,
  fromWallet = "treasury"
): Promise<SendResult> {
  if (SIMULATE) {
    // Simulated payout for hosted demo — real execution runs on the local deployment
    const fakeHash = "0x" + Array.from({length: 64}, () => "0123456789abcdef"[Math.floor(Math.random()*16)]).join("");
    return { txHash: fakeHash, to: toAddress, amount: String(amountUsdt * 1_000_000) };
  }
  return _executePayoutReal(amountUsdt, toAddress, fromWallet);
}

async function _executePayoutReal(
  amountUsdt: number,
  toAddress: string,
  fromWallet: string
): Promise<SendResult> {
  await ensureUnlocked(fromWallet);
  const out = await wdkCli(
    `send --network sepolia --wallet ${fromWallet} --to ${toAddress} --token usdt-test --amount ${amountUsdt} --json`,
    PASSPHRASE
  );
  const jsonLine = out.split("\n").reverse().find((l) => l.trim().startsWith("{"));
  if (!jsonLine) throw new Error(`wdk send produced no JSON: ${out.slice(-300)}`);
  const parsed = JSON.parse(jsonLine.trim());
  if (!parsed.txHash) throw new Error(`no txHash: ${JSON.stringify(parsed).slice(0, 200)}`);
  return parsed as SendResult;
}
