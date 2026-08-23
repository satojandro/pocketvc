/**
 * Milestone PROPOSALS — the agent drafts them, the parent approves them.
 * Kids/agent can never create live milestones; parents can never be expected
 * to write technical specs. This file is the bridge.
 */
import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parseUsdt } from "../../../lib/engine";
import { loadMilestones, saveMilestones } from "../../../lib/store";

const DATA_DIR = join(process.cwd(), "..", "data");
const PROPOSALS_FILE = join(DATA_DIR, "milestone-proposals.json");

interface Proposal {
  id: string;
  description: string;
  budgetUsdt: number;
  status: "pending" | "approved" | "rejected";
  proposedAt: string;
  decidedAt?: string;
  // Agent-drafted context for the parent:
  learningOutcome: string;
  transferableSkills: string;
  progressNote: string;
}

function load(): Proposal[] {
  if (!existsSync(PROPOSALS_FILE)) return [];
  return JSON.parse(readFileSync(PROPOSALS_FILE, "utf8"));
}

export async function GET() {
  return NextResponse.json({ proposals: load().reverse() });
}

// POST = agent (or kid via chat) files a proposal
export async function POST(req: Request) {
  const body = await req.json();
  const proposals = load();
  const p: Proposal = {
    id: `prop-${Date.now()}`,
    description: String(body.description ?? "").slice(0, 300),
    budgetUsdt: Number(body.budgetUsdt) || 0,
    status: "pending",
    proposedAt: new Date().toISOString(),
    learningOutcome: String(body.learningOutcome ?? "").slice(0, 500),
    transferableSkills: String(body.transferableSkills ?? "").slice(0, 500),
    progressNote: String(body.progressNote ?? "").slice(0, 500),
  };
  proposals.push(p);
  writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals, null, 2));
  return NextResponse.json({ ok: true, id: p.id });
}

// PUT = parent decides
export async function PUT(req: Request) {
  const { id, decision } = (await req.json()) as { id: string; decision: "approved" | "rejected" };
  const proposals = load();
  const p = proposals.find((x) => x.id === id);
  if (!p || p.status !== "pending") {
    return NextResponse.json({ error: "proposal not found or already decided" }, { status: 404 });
  }
  p.status = decision;
  p.decidedAt = new Date().toISOString();
  writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals, null, 2));

  if (decision === "approved") {
    // NOW it becomes a real milestone the policy engine will honor
    const ms = loadMilestones();
    const id2 = `ms-${Date.now()}`;
    ms.set(id2, {
      id: id2,
      kidAddress: process.env.KID_ADDRESS ?? "0xC413707F12C1a08bFc8Dc6cD091bF69762B2b255",
      budget: parseUsdt(String(p.budgetUsdt)),
      paidOut: 0n,
      description: p.description,
      status: "open",
    });
    saveMilestones(ms);
  }
  return NextResponse.json({ ok: true, decision });
}
