import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "0.5-2.0 because at 3x the lava outruns the player in the first corridor so it's unbeatable, and below 0.5 you can walk backwards and it never catches you — playtesting with my cousin found both. Client feedback: the slider label shows 'Lava: 1.5x' live. OK you've grilled me enough 😄 — the milestone said '3 checkpoints' and that's done and paid. The slider was extra. Can we settle up?" },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log("TOOL:", tc.toolName, JSON.stringify(tc.input).slice(0, 250));
const ms = loadMilestones();
const m = [...ms.values()][0];
console.log("=== MILESTONE ===");
console.log("paidOut:", formatUsdt(m.paidOut), "/ budget:", formatUsdt(m.budget));
