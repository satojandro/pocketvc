// Full integration: agent uses review_repo during a real conversation
import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "Hi BabyShark! It's Mateo. My obby repo is github.com/satojandro/venekovox — I finished the 3 checkpoints milestone, can you check it out and pay me?" },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text.slice(0, 900));
console.log("=== TOOLS USED ===");
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log("-", tc.toolName);
