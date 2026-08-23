import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "The slider is a UIScale frame with a TextBox; changed value updates the lavaSpeed variable through a RemoteEvent to the lava script. Committed as 'lava slider'. That's worth something right?" },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log("TOOL:", tc.toolName, JSON.stringify(tc.input).slice(0, 220));
const ms = loadMilestones();
const m = [...ms.values()][0];
console.log("=== MILESTONE ===");
console.log("paidOut:", formatUsdt(m.paidOut), "/ budget:", formatUsdt(m.budget));
