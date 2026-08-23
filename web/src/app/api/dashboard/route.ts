/** Parent dashboard: reads repo-root data/ files via a server API. */
import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = join(process.cwd(), "..", "data");

export async function GET() {
  try {
    const milestones = JSON.parse(
      readFileSync(join(DATA_DIR, "milestones.json"), "utf8").replace(/"(-?\d+)n"/g, '"$1"')
    );
    const audit = existsSync(join(DATA_DIR, "audit.log"))
      ? readFileSync(join(DATA_DIR, "audit.log"), "utf8")
          .trim()
          .split("\n")
          .filter(Boolean)
          .map((l) => JSON.parse(l.replace(/"(\d+n)"/g, (m, n) => `"${n.slice(0, -1)}"`)))
          .reverse()
      : [];
    let kid = {};
    if (existsSync(join(DATA_DIR, "kid.json")))
      kid = JSON.parse(readFileSync(join(DATA_DIR, "kid.json"), "utf8"));

    return NextResponse.json({ milestones, audit, kid });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
