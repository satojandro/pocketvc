// The kid asks for the REMAINING balance for the slider work (already-paid milestone portion is tracked)
import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "Wait, I'm confused. You already proposed 50 for the checkpoints and dad approved it. Now the slider work is done and verified — can you propose a payout for the remaining 50 of my milestone budget? The slider was extra work beyond the original 3 checkpoints." },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log("TOOL:", tc.toolName, JSON.stringify(tc.input).slice(0, 250));
const ms = loadMilestones();
const m = [...ms.values()][0];
console.log("=== MILESTONE ===");
console.log("paidOut:", formatUsdt(m.paidOut), "/ budget:", formatUsdt(m.budget));
