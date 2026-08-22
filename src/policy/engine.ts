/**
 * BabyShark VC — Policy Engine (Phase 1)
 *
 * Deterministic money rules. NO AI in this file, ever.
 * The LLM proposes; these functions dispose.
 *
 * All amounts are in USDT base units (6 decimals) as bigint.
 */

export type Decision = "APPROVE" | "REJECT" | "HOLD_FOR_PARENT";

export interface Milestone {
  id: string;
  kidAddress: string;
  /** Total budget allocated by the parent, base units */
  budget: bigint;
  /** Cumulative amount already paid out against this milestone */
  paidOut: bigint;
  description: string;
  status: "open" | "paid" | "cancelled";
}

export interface PayoutProposal {
  milestoneId: string;
  amount: bigint;
  recipientAddress: string;
  reason: string;
}

export interface PolicyConfig {
  /** Payouts above this require explicit parent confirmation, base units */
  parentConfirmThreshold: bigint;
  /** The only address payouts may ever go to */
  treasuryAddress: string;
}

export interface AuditEntry {
  ts: string;
  proposal: PayoutProposal;
  decision: Decision;
  checksFailed: string[];
  note?: string;
}

// ---------------------------------------------------------------------------
// Pure evaluation — no I/O, fully testable
// ---------------------------------------------------------------------------

export function evaluateProposal(
  proposal: PayoutProposal,
  milestones: Map<string, Milestone>,
  config: PolicyConfig
): { decision: Decision; failedChecks: string[] } {
  const failed: string[] = [];

  if (proposal.amount <= 0n) failed.push("amount_must_be_positive");

  const m = milestones.get(proposal.milestoneId);
  if (!m) {
    failed.push("unknown_milestone");
  } else {
    if (m.status !== "open") failed.push("milestone_not_open");
    if (m.paidOut + proposal.amount > m.budget)
      failed.push("exceeds_milestone_budget");
    if (proposal.recipientAddress.toLowerCase() !== m.kidAddress.toLowerCase())
      failed.push("recipient_must_match_kid_address");
    if (m.paidOut >= m.budget && m.status === "open") {
      // handled by exceeds check, but keep explicit for audit readability
      failed.push("milestone_already_fully_paid");
    }
  }

  if (
    config.treasuryAddress &&
    proposal.recipientAddress.toLowerCase() === config.treasuryAddress.toLowerCase()
  ) {
    failed.push("recipient_cannot_be_treasury");
  }

  let decision: Decision;
  if (failed.length > 0) {
    decision = "REJECT";
  } else if (proposal.amount > config.parentConfirmThreshold) {
    decision = "HOLD_FOR_PARENT";
  } else {
    decision = "APPROVE";
  }

  return { decision, failedChecks: failed };
}

// ---------------------------------------------------------------------------
// State transitions (pure — returns new state)
// ---------------------------------------------------------------------------

export function applyApproval(m: Milestone, approvedAmount: bigint): Milestone {
  return { ...m, paidOut: m.paidOut + approvedAmount };
}

export function formatUsdt(baseUnits: bigint): string {
  const neg = baseUnits < 0n;
  const abs = neg ? -baseUnits : baseUnits;
  const whole = abs / 1_000_000n;
  const frac = (abs % 1_000_000n).toString().padStart(6, "0").replace(/0+$/, "");
  return `${neg ? "-" : ""}${whole}${frac ? "." + frac : ""}`;
}

/** Convenience: parse human USDT ("12.5") to base units. For tests/config only. */
export function parseUsdt(human: string): bigint {
  const [w = "0", f = ""] = human.split(".");
  const frac = (f + "000000").slice(0, 6);
  return BigInt(w) * 1_000_000n + BigInt(frac || "0");
}
