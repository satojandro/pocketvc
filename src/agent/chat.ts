/**
 * Terminal REPL for BabyShark — lets us test the full agent loop
 * (persona + tools + policy engine) before the web UI exists.
 *
 * Usage: npm run chat
 */
import "dotenv/config";
import readline from "node:readline/promises";
import { runTurn } from "./loop.js";
import type { PolicyConfig } from "../policy/engine.js";
import { parseUsdt } from "../policy/engine.js";

const KID = process.env.KID_ADDRESS ?? "0xC413707F12C1a08bFc8Dc6cD091bF69762B2b255";

const config: PolicyConfig = {
  parentConfirmThreshold: parseUsdt(process.env.PARENT_CONFIRM_THRESHOLD ?? "25"),
  treasuryAddress: process.env.TREASURY_ADDRESS ?? "0x5e311e1A9147bc4750F53b6f23b0753450b32AdC",
};

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log("🦈 BabyShark VC — terminal session. Type your message, Ctrl-C to exit.\n");

  const messages: import("ai").ModelMessage[] = [];

  while (true) {
    const input = await rl.question("kid> ");
    if (!input.trim()) continue;
    messages.push({ role: "user", content: input });

    try {
      const result = await runTurn({ messages: [...messages], policyConfig: config });
      messages.push(...result.response.messages);
      console.log("\nbabyshark>", result.text, "\n");
    } catch (err) {
      console.error("[error]", err instanceof Error ? err.message : err);
    }
  }
}

main();
