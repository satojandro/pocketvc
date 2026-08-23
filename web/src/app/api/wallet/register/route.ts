/** Register a public address for a named family wallet. NO secrets accepted. */
import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "..", "data");

export async function POST(req: Request) {
  try {
    const { name, address } = (await req.json()) as { name: string; address: string };
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json({ error: "invalid address" }, { status: 400 });
    }
    const p = join(DATA_DIR, "registered-wallets.json");
    const reg = existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {};
    reg[name] = { address, registeredAt: new Date().toISOString() };
    writeFileSync(p, JSON.stringify(reg, null, 2));
    return NextResponse.json({ wallet: name, address, registered: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
