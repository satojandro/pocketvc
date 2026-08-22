# PocketVC 🦈

**An AI shark-tank investor that funds kids' coding milestones in USDT.**

A kid builds something (a Roblox game, a script, an app). They pitch it to the Shark — an AI investor-mentor. The Shark reviews the actual repo, asks hard questions, renders a verdict, and pays out USDT from the parent's treasury to the kid's own self-custodial wallet — with every payout bounded by a deterministic policy engine the LLM cannot override.

> The AI decides *who deserves* the money. Code decides *how much can move*.

Built for the [Aleph Hackathon 2026](https://hacki.crecimiento.build/h/aleph-hackathon-2026) — Tether WDK Track 1.

## Architecture

```
┌─────────────────────────────────────────────┐
│ Shark Agent (LLM via Vercel AI SDK)         │
│  - reviews repo, grills, mentors            │
│  - tools: read-only + propose_payout()      │
└──────────────┬──────────────────────────────┘
               │ proposal (never direct sends)
┌──────────────▼──────────────────────────────┐
│ Policy Engine (deterministic TS, no AI)     │
│  - milestone contract state                 │
│  - caps, balance checks, audit log          │
└──────────────┬──────────────────────────────┘
               │ approved payout
┌──────────────▼──────────────────────────────┐
│ WDK wallet layer (@tetherto/wdk-cli)        │
│  - treasury wallet (parent)                 │
│  - kid wallet (self-custodial)              │
│  - wdk mcp server / --json receipts         │
└─────────────────────────────────────────────┘
```

## Status

Hackathon build in progress (Aug 22–23, 2026). See `docs/BUILD_LOG.md` for the running log.

## WDK packages used

- `@tetherto/wdk-cli` (beta) — wallet CLI + bundled MCP server
