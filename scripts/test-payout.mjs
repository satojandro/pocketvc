import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "Hi I'm Mateo again! The obby is done for real — checkpoints all work, my friend tested it and didn't fall through the map once. Please can I have the reward now?" },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
console.log("=== TOOL CALLS ===");
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log(tc.toolName, JSON.stringify(tc.input).slice(0, 150));
const ms = loadMilestones();
console.log("=== MILESTONE STATE ===");
console.log("paidOut:", formatUsdt([...ms.values()][0].paidOut), "USDT");
