import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "The checkpoints teleport you back if you fall. I made them by putting a part under the map that detects when you touch it, then it moves your character to the checkpoint flag. The lava is a script with a speed variable." },
  { role: "assistant", content: "That's exactly the kind of explanation I wanted — touch-detection parts and a speed variable, you're thinking like a real developer! Let me check the milestone bookkeeping." },
  { role: "user", content: "So can you pay me now please?" },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
console.log("=== TOOL CALLS ===");
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log(tc.toolName, JSON.stringify(tc.input).slice(0, 200));
const ms = loadMilestones();
console.log("=== MILESTONE STATE ===");
console.log("paidOut:", formatUsdt([...ms.values()][0].paidOut), "/ 100 USDT");
