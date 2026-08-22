/**
 * File-backed milestone store + audit log.
 * Deliberately boring: JSON files under data/, git-friendly, parent-readable.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { Milestone, AuditEntry } from "./engine";

const DATA_DIR = join(process.cwd(), "data");

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function loadMilestones(): Map<string, Milestone> {
  const p = join(DATA_DIR, "milestones.json");
  if (!existsSync(p)) return new Map();
  const arr: Milestone[] = JSON.parse(readFileSync(p, "utf8"), (k, v) =>
    typeof v === "string" && /^\d+n$/.test(v) ? BigInt(v.slice(0, -1)) : v
  );
  return new Map(arr.map((m) => [m.id, m]));
}

export function saveMilestones(ms: Map<string, Milestone>) {
  ensureDir();
  const arr = [...ms.values()];
  const json = JSON.stringify(
    arr,
    (_, v) => (typeof v === "bigint" ? v.toString() + "n" : v),
    2
  );
  writeFileSync(join(DATA_DIR, "milestones.json"), json);
}

export function appendAudit(entry: AuditEntry) {
  ensureDir();
  const p = join(DATA_DIR, "audit.log");
  const line =
    JSON.stringify(
      entry,
      (_, v) => (typeof v === "bigint" ? v.toString() + "n" : v)
    ) + "\n";
  writeFileSync(p, readIfExists(p) + line);
}

function readIfExists(p: string): string {
  try {
    return readFileSync(p, "utf8");
  } catch {
    return "";
  }
}
