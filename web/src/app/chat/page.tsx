"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Msg { role: "user" | "assistant"; content: string }

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.text ?? `⚠️ ${data.error ?? "error"}` }]);
    } catch (e) {
      setMessages([...next, { role: "assistant", content: "⚠️ Connection hiccup — try again." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#CFFAEA]">
      <div className="mx-auto flex h-screen max-w-3xl flex-col px-4 py-6">
        <header className="flex items-center justify-between rounded-2xl border-2 border-black bg-white px-5 py-3 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <Link href="/" className="text-xl font-black">🦈 BabyShark</Link>
          <span className="rounded-full bg-green-300 px-3 py-1 text-xs font-bold">● online — remembers you</span>
        </header>

        <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-2xl border-2 border-black bg-[#FFFDF5] p-5 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          {messages.length === 0 && (
            <div className="mt-10 text-center">
              <div className="text-6xl">🦈</div>
              <p className="mt-4 text-xl font-black">Hey! I&apos;m BabyShark.</p>
              <p className="mx-auto mt-2 max-w-sm font-medium text-gray-600">
                Show me what you built! Tell me what&apos;s working, what broke,
                and what you&apos;re proud of.
              </p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl border-2 border-black px-4 py-3 font-medium shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${
                  m.role === "user" ? "bg-[#FFD23F]" : "bg-white"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {busy && (
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
      </div>
    </main>
  );
}
