/**
 * BabyShark agent loop — Phase 2.
 *
 * Wires the persona + tools into the AI SDK. This module is UI-agnostic:
 * the Next.js app (Phase 4) and a plain terminal REPL both call runTurn().
 *
 * Model provider: any OpenAI-compatible endpoint via env:
 *   LLM_BASE_URL (e.g. https://api.openai.com/v1 or an OpenRouter URL)
 *   LLM_API_KEY
 *   LLM_MODEL    (e.g. gpt-4o-mini)
 */
import { generateText, stepCountIs } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import "dotenv/config";
import { BABYSHARK_SYSTEM_PROMPT } from "./prompt.js";
import { createBabySharkTools, loadKidProfile } from "./tools.js";
import type { PolicyConfig } from "../policy/engine.js";

export interface RunTurnOptions {
  /** Conversation so far, in AI SDK message format */
  messages: import("ai").ModelMessage[];
  policyConfig: PolicyConfig;
}

export async function runTurn({ messages, policyConfig }: RunTurnOptions) {
  const provider = createOpenAICompatible({
    name: "babyshark-llm",
    baseURL: process.env.LLM_BASE_URL ?? "https://api.openai.com/v1",
    apiKey: process.env.LLM_API_KEY,
  });

  const model = provider.chatModel(process.env.LLM_MODEL ?? "gpt-4o-mini");

  // Memory tiers 2+3 injected fresh every turn:
  const kidProfile = JSON.stringify(loadKidProfile(), null, 2);

  return generateText({
    model,
    system: `${BABYSHARK_SYSTEM_PROMPT}\n\n# Kid profile (memory)\n${kidProfile}`,
    messages,
    tools: createBabySharkTools(policyConfig),
    stopWhen: stepCountIs(12), // allow multi-step tool use, bounded
  });
}
