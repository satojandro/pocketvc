/** Derive the Sepolia address for an existing wallet. */
import { NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { join } from "node:path";

const WDK = join(process.cwd(), "..", "node_modules", ".bin", "wdk");
const PASSPHRASE = process.env.WALLET_PASSPHRASE ?? "testpassphrase123";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name } = (await req.json()) as { name: string };
    // unlock then derive
    await new Promise<void>((resolve) => {
      const p = spawn(WDK, ["wallet", "unlock", "--name", name, "--ttl", "30", "--json"]);
      p.stdin.write(PASSPHRASE + "\n");
      p.stdin.end();
      p.on("close", () => resolve());
    });
    const address = await new Promise<string>((resolve, reject) => {
      const p = spawn(WDK, ["get", "address", "--wallet", name, "--network", "sepolia", "--json"]);
      let out = "";
      p.stdout.on("data", (d) => (out += d));
      p.stderr.on("data", (d) => (out += d));
      p.on("close", () => {
        const m = out.match(/\{[\s\S]*\}/);
        if (!m) return reject(new Error(out.slice(-200)));
        const parsed = JSON.parse(m[0]);
        parsed.error ? reject(new Error(parsed.error)) : resolve(parsed.address);
      });
    });
    return NextResponse.json({ wallet: name, address });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
