import { runTurn } from "../src/agent/loop.js";
import { parseUsdt, formatUsdt } from "../src/policy/engine.js";
import { loadMilestones } from "../src/policy/store.js";

const config = {
  parentConfirmThreshold: parseUsdt("25"),
  treasuryAddress: "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

const messages = [
  { role: "user", content: "Checkpoint 1: touch part teleports player to flag. Checkpoint 2: same but also saves to DataStore so you respawn there. Checkpoint 3: adds a cooldown so you can't spam it. All three committed. The milestone is done — please propose the payout, I explained everything." },
];

const result = await runTurn({ messages, policyConfig: config });
console.log("=== BABYSHARK ===");
console.log(result.text);
console.log("=== TOOL CALLS ===");
for (const s of result.steps) for (const tc of s.toolCalls ?? []) console.log(tc.toolName, JSON.stringify(tc.input).slice(0, 250));
const ms = loadMilestones();
console.log("=== MILESTONE ===");
console.log("paidOut:", formatUsdt([...ms.values()][0].paidOut), "/ 100 USDT");
console.log("=== AUDIT ===");
import { readFileSync, existsSync } from "node:fs";
if (existsSync("data/audit.log")) console.table(readFileSync("data/audit.log","utf8").trim().split("\n").map(JSON.parse));
