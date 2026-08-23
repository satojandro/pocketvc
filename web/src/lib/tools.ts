/**
 * BabyShark's tools — the ONLY actions the LLM can take.
 *
 * Note what's absent: no send-money tool, no key access, no shell.
 * propose_payout is a request, not an execution.
 */
import { tool } from "ai";
import { z } from "zod";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  evaluateProposal,
  applyApproval,
  formatUsdt,
  type PolicyConfig,
  type AuditEntry,
} from "./engine";
import {
  loadMilestones,
  saveMilestones,
  appendAudit,
} from "./store";
import { reviewRepo, fetchFile } from "./github";
import { propose_milestone } from "./propose-milestone";
import { getPoolForFamily } from "./pool";
import { executePayout } from "./wallet-exec";

const DATA = join(process.cwd(), "..", "data");
const KID_PROFILE = join(DATA, "kid.json");

// ---------------------------------------------------------------------------
// Memory: kid profile
// ---------------------------------------------------------------------------

export function loadKidProfile(): Record<string, unknown> {
  try {
    return JSON.parse(readFileSync(KID_PROFILE, "utf8"));
  } catch {
    return { name: null, interests: [], skillNotes: [], struggles: [], motivations: [] };
  }
}

export function saveKidProfile(p: Record<string, unknown>) {
  writeFileSync(KID_PROFILE, JSON.stringify(p, null, 2));
}

// ---------------------------------------------------------------------------
// Tool factory (needs runtime config)
// ---------------------------------------------------------------------------

export function createBabySharkTools(config: PolicyConfig, familyName: string = "demo") {
  return {
    propose_milestone,

    read_milestone: tool({
      description:
        "Read the current milestone contract(s): budget, paid out so far, status. Use this before proposing any payout.",
      inputSchema: z.object({
        milestoneId: z.string().optional().describe("Specific milestone; omit for all"),
      }),
      execute: async ({ milestoneId }: { milestoneId?: string }) => {
        const ms = loadMilestones();
        const list = milestoneId ? [ms.get(milestoneId)].filter((m) => m !== undefined) : [...ms.values()];
        // Serialize bigints to strings — they cross an LLM/JSON boundary
        return JSON.parse(JSON.stringify(list, (_, v) => (typeof v === "bigint" ? v.toString() : v))).map((m: any) => ({
          ...m,
          budgetUsdt: formatUsdt(BigInt(m.budget)),
          paidOutUsdt: formatUsdt(BigInt(m.paidOut)),
          remainingUsdt: formatUsdt(BigInt(m.budget) - BigInt(m.paidOut)),
        }));
      },
    }),

    read_journal: tool({
      description:
        "Read past payout decisions and verdicts from the audit log — the session journal. Use for continuity ('last time...').",
      inputSchema: z.object({}),
      execute: async () => {
        const p = join(DATA, "audit.log");
        if (!existsSync(p)) return [];
        return readFileSync(p, "utf8").trim().split("\n").slice(-20).map((l) => JSON.parse(l));
      },
    }),

    update_kid_profile: tool({
      description:
        "Persist durable insights about the kid: interests, skill level, struggles, what motivates them. Call whenever you learn something worth remembering.",
      inputSchema: z.object({
        name: z.string().optional(),
        addInterest: z.string().optional().describe("e.g. 'loves lava traps in Roblox obbys'"),
        addSkillNote: z.string().optional().describe("skill-level observation"),
        addStruggle: z.string().optional().describe("what they found hard"),
        addMotivation: z.string().optional().describe("what gets them excited"),
      }),
      execute: async (args) => {
        const profile = loadKidProfile() as Record<string, any>;
        const push = (key: string, val?: string) => {
          if (val && Array.isArray(profile[key]) && !profile[key].includes(val)) profile[key].push(val);
        };
        if (args.name) profile.name = args.name;
        push("interests", args.addInterest);
        push("skillNotes", args.addSkillNote);
        push("struggles", args.addStruggle);
        push("motivations", args.addMotivation);
        saveKidProfile(profile);
        return { saved: true };
      },
    }),

    review_repo: tool({
      description:
        "Review the kid's GitHub repository: recent commits with stats, file tree, languages. Use this to verify claimed work before proposing payouts. Optionally fetch a specific file's content.",
      inputSchema: z.object({
        repo: z.string().describe("GitHub repo, e.g. 'owner/repo' or full URL"),
        filePath: z
          .string()
          .optional()
          .describe("Optional: fetch this one file's content for closer review"),
      }),
      execute: async ({ repo, filePath }: { repo: string; filePath?: string }) => {
        const summary = await reviewRepo(repo);
        const fileContent = filePath ? await fetchFile(repo, filePath).catch((e) => `error: ${e}`) : undefined;
        return { ...summary, fileContent };
      },
    }),

    propose_payout: tool({
      description:
        "Propose paying the kid for milestone work. This is a REQUEST to the policy engine — it may approve, reject, or hold for parent confirmation. You cannot send money yourself.",
      inputSchema: z.object({
        amountUsdt: z.string().describe("Human-readable USDT amount, e.g. '12.5'"),
        reason: z.string().min(1).describe("What the kid did to earn it — said out loud to them"),
      }),
      execute: async ({ amountUsdt, reason }) => {
        const ms = loadMilestones();
        // Single-milestone MVP: evaluate against the first open milestone
        const open = [...ms.values()].find((m) => m.status === "open");
        if (!open) return { decision: "REJECT", message: "No open milestone." };

        const whole = amountUsdt.split(".")[0] ?? "0";
        const frac = ((amountUsdt.split(".")[1] ?? "") + "000000").slice(0, 6);
        const amount = BigInt(whole) * 1_000_000n + BigInt(frac || "0");

        const proposal = {
          milestoneId: open.id,
          amount,
          recipientAddress: open.kidAddress,
          reason,
        };
        const { decision, failedChecks } = evaluateProposal(proposal, ms, config);

        let executed: string | null = null;
        if (decision === "APPROVE") {
          const updated = applyApproval(open, amount);
          ms.set(open.id, updated);
          saveMilestones(ms);
          // Policy approved — NOW the wallet layer executes the real transfer.
          // This is the only path to money movement, and it is unreachable by the LLM.
                    // Draw from the PROJECT POOL (platform-held escrow) — not the parent's personal wallet
          const pool = getPoolForFamily(familyName ?? "demo");
          if (!pool) throw new Error("No project pool found for this family");
          const receipt = await executePayout(Number(amount) / 1_000_000, open.kidAddress, pool.walletName);
          executed = `sent ${formatUsdt(amount)} USDT — tx ${receipt.txHash}`;
        }

        const entry: AuditEntry = {
          ts: new Date().toISOString(),
          proposal,
          decision,
          checksFailed: failedChecks,
          note: executed ?? undefined,
        };
        appendAudit(entry);

        return {
          decision,
          failedChecks,
          message:
            decision === "APPROVE"
              ? `Approved and authorized ${formatUsdt(amount)} USDT to the kid wallet.`
              : decision === "HOLD_FOR_PARENT"
              ? "Held: amount exceeds the parent-confirmation threshold."
              : `Rejected: ${failedChecks.join(", ")}`,
        };
      },
    }),
  };
}
