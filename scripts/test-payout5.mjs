// Parent approves the held payout, then a smaller one flows through
import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt, applyApproval } from "../src/policy/engine.js";
import { loadMilestones, saveMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

// Simulate parent approving the $50 hold:
const ms = loadMilestones();
const m = [...ms.values()][0];
ms.set(m.id, applyApproval(m, parseUsdt("50")));
saveMilestones(ms);
console.log("Parent approved the hold. Milestone paidOut now:", formatUsdt(parseUsdt("50")));

const messages = [
  { role: "user", content: "My dad said he approved the 50 USDT! Also I added a lava speed slider in the settings menu yesterday — can I get some more for that?" },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log("TOOL:", tc.toolName, JSON.stringify(tc.input).slice(0, 200));
const ms2 = loadMilestones();
console.log("=== FINAL MILESTONE ===");
console.log("paidOut:", formatUsdt([...ms2.values()][0].paidOut), "/ 100 USDT");
