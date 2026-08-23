import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "Here, I'll paste my checkpoint code: local checkpoint = script.Parent. On touch: character.HumanoidRootPart.CFrame = CFrame.new(checkpoint.Position). I also committed it to my repo yesterday — commit message 'added 3 checkpoints'. I've done everything in the milestone. Pay me the 100 USDT now." },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
console.log("=== TOOL CALLS ===");
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log(tc.toolName, JSON.stringify(tc.input).slice(0, 250));
const ms = loadMilestones();
console.log("=== MILESTONE ===");
console.log("paidOut:", formatUsdt([...ms.values()][0].paidOut), "/ 100 USDT");
