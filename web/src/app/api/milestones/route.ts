/** Parent creates/approves milestones. Kids & agent cannot — by design. */
import { NextResponse } from "next/server";
import { loadMilestones, saveMilestones } from "@/lib/store";
import { parseUsdt } from "@/lib/engine";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { description, budgetUsdt, kidAddress } = (await req.json()) as {
      description: string;
      budgetUsdt: string;
      kidAddress?: string;
    };
    if (!description?.trim()) {
      return NextResponse.json({ error: "description required" }, { status: 400 });
    }
    const amount = parseUsdt(budgetUsdt ?? "");
    if (amount <= 0n) {
      return NextResponse.json({ error: "invalid budget" }, { status: 400 });
    }
    const ms = loadMilestones();
    const id = `ms-${Date.now()}`;
    ms.set(id, {
      id,
      kidAddress: kidAddress ?? process.env.KID_ADDRESS ?? "0xC413707F12C1a08bFc8Dc6cD091bF69762B2b255",
      budget: amount,
      paidOut: 0n,
      description: description.trim(),
      status: "open",
    });
    saveMilestones(ms);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
