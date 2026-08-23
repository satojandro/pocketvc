import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "I used the RemoteEvent because the slider is on the client UI but lavaSpeed lives in the server script — if I changed it directly from a LocalScript it wouldn't replicate to the server, and exploiters could set it anyway. So client fires RemoteEvent, server validates range 0.5-2.0 and updates." },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log("TOOL:", tc.toolName, JSON.stringify(tc.input).slice(0, 220));
const ms = loadMilestones();
console.log("=== MILESTONE ===");
console.log("paidOut:", formatUsdt([...ms.values()][0].paidOut), "/", formatUsdt([...ms.values()][0].budget));
