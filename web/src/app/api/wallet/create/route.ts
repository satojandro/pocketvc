/**
 * Server-side WDK wallet operations for the setup wizard.
 * Shells out to the wdk CLI installed at the repo root.
 *
 * SECURITY NOTE: this route exists to make the hackathon demo fully
 * self-serve. In production, wallet creation happens client-side (keys
 * generated in the user's browser/device via WDK SDK) — a server should
 * never see seed material. The passphrase comes from server env here
 * because the CLI requires interactive input otherwise.
 * Full disclosure: docs/SECURITY_NOTES.md
 */
import { spawn } from "node:child_process";
import { join } from "node:path";
import { NextResponse } from "next/server";

const WDK = join(process.cwd(), "..", "node_modules", ".bin", "wdk");
const PASSPHRASE = process.env.WALLET_PASSPHRASE ?? "testpassphrase123";

function run(args: string[], input?: string): Promise<{ code: number; out: string }> {
  return new Promise((resolve) => {
    const p = spawn(WDK, args, {
      cwd: process.cwd(),
      env: { ...process.env, FORCE_COLOR: "0", CI: "1", WDK_PASSPHRASE: input ?? "" },
      stdio: ["pipe", "pipe", "pipe"],
    });
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (out += d));
    if (input) {
      p.stdin.write(input + "\n");
      setTimeout(() => { try { p.stdin.write(input + "\n"); } catch {} }, 2500);
      setTimeout(() => { try { p.stdin.end(); } catch {} }, 4000);
    } else {
      p.stdin.end();
    }
    const t = setTimeout(() => { try { p.kill(); } catch {} }, 60000);
    p.on("close", (code) => { clearTimeout(t); resolve({ code: code ?? 1, out }); });
  });
}

async function createWallet(name: string): Promise<{ wallet: string; seedPhrase: string }> {
  const { out } = await run(["wallet", "create", "--name", name, "--json"], PASSPHRASE);
  const m = out.match(/\{[\s\S]*\}/);
  if (!m) throw new Error(`wallet create failed: ${out.slice(-300)}`);
  const parsed = JSON.parse(m[0]);
  if (parsed.error) throw new Error(parsed.error);
  return { wallet: parsed.wallet, seedPhrase: parsed.seedPhrase };
}

async function unlock(name: string) {
  await new Promise<void>((resolve) => {
    const p = spawn(WDK, ["wallet", "unlock", "--name", name, "--ttl", "60", "--json"]);
    let out = "";
    let writes = 0;
    const iv = setInterval(() => {
      if (writes < 10) { try { p.stdin.write(PASSPHRASE + "\n"); writes++; } catch {} }
      else { try { p.stdin.end(); } catch {} }
    }, 1200);
    p.stdout.on("data", (d) => { out += d; if (out.includes('"unlocked"')) { clearInterval(iv); p.kill(); resolve(); } });
    p.stderr.on("data", (d) => (out += d));
    p.on("close", () => { clearInterval(iv); if (!out.includes('"unlocked"')) resolve(); });
  });
}

async function getAddress(name: string): Promise<string> {
  const { out } = await run(["get", "address", "--wallet", name, "--network", "sepolia", "--json"]);
  const m = out.match(/\{[\s\S]*\}/);
  if (!m) throw new Error(`get address failed: ${out.slice(-300)}`);
  const parsed = JSON.parse(m[0]);
  if (parsed.error) throw new Error(parsed.error);
  return parsed.address;
}

export async function POST(req: Request) {
  try {
    const { name } = (await req.json()) as { name: string };
    if (!/^[a-z0-9-]{3,20}$/i.test(name)) {
      return NextResponse.json({ error: "Name must be 3-20 letters/numbers" }, { status: 400 });
    }
    const { wallet, seedPhrase } = await createWallet(name);
    await unlock(wallet);
    const address = await getAddress(wallet);
    return NextResponse.json({ wallet, address, seedPhrase });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err), debug: (err as any)?.debug ?? undefined }, { status: 500 });
  }
}
