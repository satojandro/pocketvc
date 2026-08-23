/**
 * Agent tool: propose a NEW milestone for parent approval.
 * The agent drafts it (with learning outcome + transferable skills explained
 * for a non-technical parent); the parent approves or rejects on the dashboard.
 * The agent can NEVER create live milestones directly.
 */
import { tool } from "ai";
import { z } from "zod";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DATA = join(process.cwd(), "..", "data");
const PROPOSALS_FILE = join(DATA, "milestone-proposals.json");

export const propose_milestone = tool({
  description:
    "Propose a NEW milestone for the parent to approve. Use this when the kid wants to work on something new that has no open milestone yet. Draft it in parent-friendly language: what they'll build, what they'll LEARN, and why it matters. The parent approves or rejects on their dashboard — you cannot create milestones yourself.",
  inputSchema: z.object({
    title: z.string().describe("Short milestone title, e.g. 'Candy Tycoon: planning + money system'"),
    budgetUsdt: z.number().describe("Requested USDT budget for this milestone"),
    whatBuilding: z.string().describe("Plain-language description of what the kid will build"),
    learningOutcome: z.string().describe("What real skills the kid will learn (for the parent)"),
    transferableSkills: z.string().describe("How those skills transfer beyond this project"),
  }),
  execute: async ({ title, budgetUsdt, whatBuilding, learningOutcome, transferableSkills }) => {
    const proposals = existsSync(PROPOSALS_FILE)
      ? JSON.parse(readFileSync(PROPOSALS_FILE, "utf8"))
      : [];
    const id = `prop-${Date.now()}`;
    proposals.push({
      id,
      description: `${title} — ${whatBuilding}`,
      budgetUsdt,
      status: "pending",
      proposedAt: new Date().toISOString(),
      learningOutcome,
      transferableSkills,
      progressNote: `Proposed by BabyShark after discussing with the kid.`,
    });
    writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals, null, 2));
    return {
      ok: true,
      proposalId: id,
      message:
        "Sent to the parent dashboard for approval. Tell the kid: 'I sent your idea to your parents — once they approve it, we start!'",
    };
  },
});
