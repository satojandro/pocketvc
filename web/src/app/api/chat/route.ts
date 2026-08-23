/** Shared API route: talks to the agent loop server-side. */
import { NextResponse } from "next/server";
import { generateText, stepCountIs, type ModelMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { join } from "node:path";
import { BABYSHARK_SYSTEM_PROMPT } from "@/lib/prompt";
import { createBabySharkTools } from "@/lib/tools";
import { parseUsdt, type PolicyConfig } from "@/lib/engine";

export const runtime = "nodejs";
export const maxDuration = 120;

// data/ lives at repo root; web/ runs with cwd=web so resolve upward
const DATA_DIR = join(process.cwd(), "..", "data");

// Minimal env-based config (reads repo-root .env via next.config or shell)
function policyConfig(): PolicyConfig {
  return {
    parentConfirmThreshold: parseUsdt(process.env.PARENT_CONFIRM_THRESHOLD ?? "25"),
    treasuryAddress: process.env.TREASURY_ADDRESS ?? "",
  };
}

// Point the tools' file access at the repo root by faking cwd is not possible;
// instead we chdir-safe: our store uses process.cwd()/data — run `next dev` from root.
export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ModelMessage[] };

    const provider = createOpenAICompatible({
      name: "babyshark-llm",
      baseURL: process.env.LLM_BASE_URL ?? "https://openrouter.ai/api/v1",
      apiKey: process.env.LLM_API_KEY,
    });

    const kidProfile = JSON.stringify(
      JSON.parse((await import("node:fs")).readFileSync(join(DATA_DIR, "kid.json"), "utf8")),
      null,
      2
    );

    const result = await generateText({
      model: provider.chatModel(process.env.LLM_MODEL ?? "openai/gpt-4o-mini"),
      system: `${BABYSHARK_SYSTEM_PROMPT}\n\n# Kid profile (memory)\n${kidProfile}`,
      messages,
      tools: createBabySharkTools(policyConfig()),
      stopWhen: stepCountIs(12),
    });

    const toolActivity: { tool: string; summary: string }[] = [];
    for (const step of result.steps) {
      for (const tc of (step.toolCalls as Array<{toolName: string; input?: Record<string, unknown>}>) ?? []) {
        const input = tc.input ?? {};
        let summary = "";
        switch (tc.toolName) {
          case "review_repo":
            summary = `checked ${input.repo ?? "repo"}`;
            break;
          case "read_milestone":
            summary = "checked milestone budget";
            break;
          case "read_journal":
            summary = "recalled past sessions";
            break;
          case "update_kid_profile":
            summary = "updated memory";
            break;
          case "propose_payout": {
            const r = (step.toolResults as Array<{toolName: string; output?: {decision?: string}}>)?.find((t) => t.toolName === "propose_payout");
            summary = r?.output?.decision
              ? `payout ${r.output.decision === "APPROVE" ? "approved ✅" : r.output.decision === "HOLD_FOR_PARENT" ? "held for parent ⏳" : "rejected ❌"}`
              : "proposed payout";
            break;
          }
          default:
            summary = tc.toolName;
        }
        toolActivity.push({ tool: tc.toolName, summary });
      }
    }

    return NextResponse.json({ text: result.text, toolActivity });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
