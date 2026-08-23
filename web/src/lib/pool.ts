/**
 * Server-held PROJECT POOL wallet — the functional escrow.
 *
 * Created during family setup. Seed phrase is NEVER exposed to anyone
 * (not the parent, not the kid, not the chat). Deposits go in freely;
 * the only exit is executePayout() after policy approval.
 *
 * Custody model: platform-held (like GoFundMe holding campaign funds).
 * Production upgrade path: swap for an escrow smart contract to make the
 * guarantee cryptographic rather than procedural.
 */
import { spawn } from "node:child_process";
import { join } from "node:path";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const WDK = join(process.cwd(), "..", "node_modules", ".bin", "wdk");
const PASSPHRASE = process.env.WALLET_PASSPHRASE ?? "";
const REGISTRY_FILE = join(process.cwd(), "..", "data", "pool-registry.json");

interface PoolInfo {
  walletName: string;
  address: string;
  createdAt: string;
}

function loadRegistry(): Record<string, PoolInfo> {
  if (!existsSync(REGISTRY_FILE)) return {};
  return JSON.parse(readFileSync(REGISTRY_FILE, "utf8"));
}

export function getPoolForFamily(familyName: string): PoolInfo | undefined {
  return loadRegistry()[familyName.toLowerCase()];
}

/** Spawn wdk CLI with delayed passphrase writes (prompts need a live stdin). */
function wdkCli(args: string[], input: string, successMarker = ""): Promise<string> {
  return new Promise((resolve, reject) => {
    const p = spawn(WDK, args, { cwd: process.cwd() });
    let out = "";
    let writes = 0;
    p.stdout.on("data", (d) => { out += d; if (successMarker && out.includes(successMarker)) finish(); });
    p.stderr.on("data", (d) => (out += d));
    const iv = setInterval(() => {
      if (writes < 6) { try { p.stdin.write(input + "\n"); writes++; } catch {} }
      else { try { p.stdin.end(); } catch {} }
    }, 2000);
    const t = setTimeout(() => { try { p.kill(); } catch {} }, 90000);
    function finish() { clearInterval(iv); clearTimeout(t); resolve(out); }
    p.on("close", () => { clearInterval(iv); clearTimeout(t); resolve(out); });
  });
}

/** Create the project pool wallet server-side. Returns public address ONLY. */
export async function createPool(familyName: string): Promise<PoolInfo> {
  const key = familyName.toLowerCase();
  if (!/^[a-z0-9-]{3,20}$/.test(key)) throw new Error("invalid family name");
  const existing = getPoolForFamily(key);
  if (existing) return existing;

  const poolName = `${key}-pool`;
  // create with our own passphrase — seed stays on this machine, never displayed
  let out = await wdkCli(["wallet", "create", "--name", poolName, "--json"], PASSPHRASE);
  if (!out.includes('"wallet"')) throw new Error(`pool creation failed: ${out.slice(-200)}`);
  await wdkCli(["wallet", "unlock", "--name", poolName, "--ttl", "60", "--json"], PASSPHRASE);
  const addrOut = await wdkCli(
    ["get", "address", "--wallet", poolName, "--network", "sepolia", "--json"],
    PASSPHRASE
  );
  const m = addrOut.match(/\{[\s\S]*\}/);
  if (!m) throw new Error(`address derivation failed: ${addrOut.slice(-200)}`);
  const address = JSON.parse(m[0]).address;

  const info: PoolInfo = { walletName: poolName, address, createdAt: new Date().toISOString() };
  const reg = loadRegistry();
  reg[key] = info;
  writeFileSync(REGISTRY_FILE, JSON.stringify(reg, null, 2));
  return info;
}
