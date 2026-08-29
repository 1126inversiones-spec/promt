"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download } from "lucide-react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export interface HistoryEntry {
  id: string;
  dish: string;
  categoryTitle: string;
  prompt: string;
}

function exportEntries(entries: HistoryEntry[]) {
  const date = new Date().toISOString().slice(0, 10);
  const body = entries
    .map(
      (e, i) =>
        `${i + 1}. ${e.dish} \u2014 ${e.categoryTitle}\n${"-".repeat(40)}\n${e.prompt}\n`
    )
    .join("\n");
  const content = `Prompt Studio \u2014 exported ${date}\n${"=".repeat(40)}\n\n${body}`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `prompt-studio-export-${date}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function HistoryPanel({ entries }: { entries: HistoryEntry[] }) {
  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-cream">My prompt list</h3>
        {entries.length > 0 && (
          <button
            onClick={() => exportEntries(entries)}
            className="flex items-center gap-1.5 text-xs text-ember-400 transition-colors hover:text-ember-300"
          >
            <Download size={12} />
            Export
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-smoke">You haven't saved any prompts yet.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <HistoryRow key={entry.id} entry={entry} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function HistoryRow({ entry }: { entry: HistoryEntry }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(entry.prompt);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="depth-card flex items-center justify-between gap-3 rounded-xl px-4 py-3"
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-cream">{entry.dish}</div>
        <div className="mt-0.5 text-xs text-smoke">{entry.categoryTitle}</div>
      </div>
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={handleCopy}
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-ember-400 transition-colors hover:border-ember-500/50"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </motion.button>
    </motion.div>
  );
}
