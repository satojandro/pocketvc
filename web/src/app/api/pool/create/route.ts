/** Create the family's project pool wallet (server-held escrow). Returns public address only. */
import { NextResponse } from "next/server";
import { createPool } from "@/lib/pool";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { familyName } = (await req.json()) as { familyName: string };
    if (!familyName) return NextResponse.json({ error: "familyName required" }, { status: 400 });
    const pool = await createPool(familyName);
    // NOTE: intentionally does NOT return the seed phrase — the pool is platform-held
    return NextResponse.json({ walletName: pool.walletName, address: pool.address });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
