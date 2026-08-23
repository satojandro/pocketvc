"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Msg {
  role: "user" | "assistant";
  content: string;
  toolActivity?: { tool: string; summary: string }[];
}

const TOOL_ICONS: Record<string, string> = {
  review_repo: "🔍",
  read_milestone: "📋",
  read_journal: "📔",
  update_kid_profile: "🧠",
  propose_payout: "💰",
};

function Confetti() {
  const [pieces] = useState(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        color: ["#FFD23F", "#FF6B9D", "#3EC1D3", "#7AE582"][i % 4],
        size: 6 + Math.random() * 10,
      }))
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-[confetti_2.2s_ease-in_forwards] rounded-sm"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            width: p.size,
            height: p.size * 0.5,
            background: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [activity, setActivity] = useState<string[]>([]);
  const [celebrate, setCelebrate] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy, activity]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setBusy(true);
    setActivity(["🦈 BabyShark is thinking…"]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setActivity([]);
      if (data.toolActivity?.length) {
        // reveal activity chips one by one for effect
        for (let i = 0; i < data.toolActivity.length; i++) {
          const t = data.toolActivity[i];
          setActivity((prev) => [...prev, `${TOOL_ICONS[t.tool] ?? "🔧"} ${t.summary}`]);
          await new Promise((r) => setTimeout(r, 450));
        }
        await new Promise((r) => setTimeout(r, 500));
      }
      setActivity([]);
      setMessages([...next, { role: "assistant", content: data.text ?? `⚠️ ${data.error ?? "error"}`, toolActivity: data.toolActivity }]);
      if (data.toolActivity?.some((t: any) => t.summary.includes("approved"))) {
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 3000);
      }
    } catch {
      setActivity([]);
      setMessages([...next, { role: "assistant", content: "⚠️ Connection hiccup — try again." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#CFFAEA]">
      {celebrate && <Confetti />}

      <div className="mx-auto flex h-screen w-full max-w-3xl flex-col px-4 py-6">
        <header className="flex items-center justify-between rounded-2xl border-2 border-black bg-white px-5 py-3 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <Link href="/" className="text-xl font-black">
            🦈 BabyShark
          </Link>
          <span className="rounded-full bg-green-300 px-3 py-1 text-xs font-bold">● online — remembers you</span>
        </header>

        <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-2xl border-2 border-black bg-[#FFFDF5] p-5 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          {messages.length === 0 && (
            <div className="mt-10 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shark-hero.png" alt="BabyShark" className="mx-auto h-36 w-36 rounded-full border-4 border-black object-cover shadow-[6px_6px_0_0_rgba(0,0,0,1)]" />
              <p className="mt-4 text-2xl font-black">Hey! I&apos;m BabyShark.</p>
              <p className="mx-auto mt-2 max-w-sm font-medium text-gray-600">
                Show me what you built! Tell me what&apos;s working, what broke,
                and what you&apos;re proud of.
              </p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src="/shark-hero.png" alt="" className="h-9 w-9 shrink-0 rounded-full border-2 border-black object-cover" />
              )}
              <div className={`max-w-[80%] ${m.role === "user" ? "order-1" : ""}`}>
                {m.toolActivity && m.toolActivity.length > 0 && (
                  <div className="mb-1 flex flex-wrap gap-1">
                    {m.toolActivity.map((t, j) => (
                      <span key={j} className="rounded-full border border-gray-300 bg-gray-50 px-2 py-0.5 text-xs font-semibold text-gray-600">
                        {TOOL_ICONS[t.tool] ?? "🔧"} {t.summary}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  className={`whitespace-pre-wrap rounded-2xl border-2 border-black px-4 py-3 font-medium shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${
                    m.role === "user" ? "bg-[#FFD23F]" : "bg-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            </div>
          ))}

          {activity.length > 0 && (
            <div className="space-y-1 pl-11">
              {activity.map((a, i) => (
                <div key={i} className={`inline-block rounded-full border px-3 py-1 text-sm font-bold ${a.includes("approved") ? "animate-bounce border-black bg-green-300" : "border-gray-400 bg-white text-gray-700"}`}>
                  {a}
                </div>
              ))}
            </div>
          )}

          {busy && activity.length === 0 && (
            <div className="flex justify-start">
              <div className="animate-pulse rounded-2xl border-2 border-black bg-white px-4 py-3 font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                🦈 thinking…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Tell the Shark what you built…"
            className="flex-1 rounded-2xl border-2 border-black bg-white px-5 py-4 font-medium outline-none focus:bg-yellow-50"
            disabled={busy}
          />
          <button
            onClick={send}
            disabled={busy || !input.trim()}
            className="rounded-2xl border-2 border-black bg-[#FF6B9D] px-8 py-4 text-lg font-black text-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-40"
          >
            Send
          </button>
        </div>

        <p className="mt-2 text-center text-xs font-semibold text-black/50">
          BabyShark can only <em>propose</em> payouts — a policy engine + your parent have final say.
        </p>
      </div>
    </main>
  );
}
