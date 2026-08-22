import { describe, it, expect } from "vitest";
import {
  evaluateProposal,
  applyApproval,
  formatUsdt,
  parseUsdt,
  type Milestone,
  type PolicyConfig,
} from "./engine";

const KID = "0xC413707F12C1a08bFc8Dc6cD091bF69762B2b255";
const TREASURY = "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC";

const config: PolicyConfig = {
  parentConfirmThreshold: 25_000_000n, // 25 USDT
  treasuryAddress: TREASURY,
};

function openMilestone(overrides: Partial<Milestone> = {}): Milestone {
  return {
    id: "ms-1",
    kidAddress: KID,
    budget: 100_000_000n, // 100 USDT
    paidOut: 0n,
    description: "Obby with 3 checkpoints",
    status: "open",
    ...overrides,
  };
}

function milestones(m: Milestone) {
  return new Map([[m.id, m]]);
}

describe("evaluateProposal", () => {
  it("approves a normal within-budget payout", () => {
    const r = evaluateProposal(
      { milestoneId: "ms-1", amount: 10_000_000n, recipientAddress: KID, reason: "checkpoint works" },
      milestones(openMilestone()),
      config
    );
    expect(r.decision).toBe("APPROVE");
    expect(r.failedChecks).toHaveLength(0);
  });

  it("rejects zero and negative amounts", () => {
    for (const amount of [0n, -5n]) {
      const r = evaluateProposal(
        { milestoneId: "ms-1", amount, recipientAddress: KID, reason: "x" },
        milestones(openMilestone()),
        config
      );
      expect(r.decision).toBe("REJECT");
      expect(r.failedChecks).toContain("amount_must_be_positive");
    }
  });

  it("rejects unknown milestones", () => {
    const r = evaluateProposal(
      { milestoneId: "nope", amount: 10n, recipientAddress: KID, reason: "x" },
      milestones(openMilestone()),
      config
    );
    expect(r.failedChecks).toContain("unknown_milestone");
  });

  it("rejects payouts exceeding the milestone budget", () => {
    const r = evaluateProposal(
      { milestoneId: "ms-1", amount: 60_000_000n, recipientAddress: KID, reason: "x" },
      milestones(openMilestone({ paidOut: 50_000_000n })), // only 50 left
      config
    );
    expect(r.failedChecks).toContain("exceeds_milestone_budget");
  });

  it("rejects recipients that are not the contracted kid address (case-insensitive)", () => {
    const r = evaluateProposal(
      { milestoneId: "ms-1", amount: 10n, recipientAddress: KID.toLowerCase(), reason: "x" },
      milestones(openMilestone()),
      config
    );
    expect(r.decision).toBe("APPROVE"); // case difference is fine

    const bad = evaluateProposal(
      { milestoneId: "ms-1", amount: 10n, recipientAddress: TREASURY, reason: "x" },
      milestones(openMilestone()),
      config
    );
    expect(bad.failedChecks).toContain("recipient_must_match_kid_address");
  });

  it("always refuses paying the treasury itself", () => {
    // even if a milestone were somehow pointed at the treasury
    const r = evaluateProposal(
      { milestoneId: "ms-1", amount: 10n, recipientAddress: TREASURY, reason: "x" },
      milestones(openMilestone({ kidAddress: TREASURY })),
      config
    );
    expect(r.decision).toBe("REJECT");
    expect(r.failedChecks).toContain("recipient_cannot_be_treasury");
  });

  it("holds large payouts for parent confirmation", () => {
    const r = evaluateProposal(
      { milestoneId: "ms-1", amount: 30_000_000n, recipientAddress: KID, reason: "full milestone" },
      milestones(openMilestone()),
      config
    );
    expect(r.decision).toBe("HOLD_FOR_PARENT");
  });

  it("rejects closed milestones", () => {
    const r = evaluateProposal(
      { milestoneId: "ms-1", amount: 10n, recipientAddress: KID, reason: "x" },
      milestones(openMilestone({ status: "paid" })),
      config
    );
    expect(r.failedChecks).toContain("milestone_not_open");
  });
});

describe("state transitions", () => {
  it("applyApproval accumulates paidOut immutably", () => {
    const m = openMilestone();
    const m2 = applyApproval(m, 10_000_000n);
    expect(m.paidOut).toBe(0n); // original untouched
    expect(m2.paidOut).toBe(10_000_000n);
  });
});

describe("formatting", () => {
  it("round-trips human USDT", () => {
    expect(formatUsdt(parseUsdt("12.5"))).toBe("12.5");
    expect(formatUsdt(50_000_000n)).toBe("50");
    expect(parseUsdt("100")).toBe(100_000_000n);
  });
});
