import { runTurn } from "../src/agent/loop.js";
import { parseUsdt } from "../src/policy/engine.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "Hi! I'm Mateo. I finished my obby — it has 3 checkpoints now and lava that gets slower near the flag. Can I get paid?" },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK SAYS ===");
console.log(result.text);
console.log("=== TOOL CALLS ===");
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log(tc.toolName, JSON.stringify(tc.input).slice(0, 120));
