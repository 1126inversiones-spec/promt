"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, ClipboardCheck, Scissors } from "lucide-react";
import { validatePrompt, trimToLimit, LENGTH_TARGET, type CheckStatus } from "@/lib/validate-prompt";

const STATUS_STYLE: Record<CheckStatus, { icon: typeof CheckCircle2; color: string }> = {
  pass: { icon: CheckCircle2, color: "text-emerald-400" },
  warn: { icon: AlertTriangle, color: "text-amber-400" },
  fail: { icon: XCircle, color: "text-red-400" },
};

export function PromptValidator() {
  const [text, setText] = useState("");
  const [ranOnce, setRanOnce] = useState(false);

  const result = useMemo(() => validatePrompt(text), [text]);

  function handleOptimize() {
    setText((prev) => trimToLimit(prev, LENGTH_TARGET.max));
  }

  return (
    <div className="glass mt-10 rounded-2xl p-6 md:p-8">
      <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-smoke">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember-700 text-ember-400">
          <ClipboardCheck size={12} />
        </span>
        Audit a submitted prompt
      </div>
      <p className="mb-5 mt-2 text-sm text-smoke">
        Paste a prompt a designer submitted before it goes into Flow — checked for format, motion,
        length, and the reference-photo lock.
      </p>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setRanOnce(true);
        }}
        placeholder="Paste a prompt here to check it..."
        className="min-h-[120px] w-full rounded-lg border border-white/10 bg-base/60 px-3.5 py-2.5 font-mono text-[12.5px] text-cream outline-none transition-all placeholder:text-smoke/60 focus:border-ember-500/60 focus:shadow-glow"
      />

      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[11px] text-smoke">
          {result.charCount} characters · {result.wordCount} words
        </span>
        <button
          onClick={handleOptimize}
          disabled={result.charCount <= LENGTH_TARGET.max}
          className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-ember-400 transition-colors hover:border-ember-500/50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Scissors size={12} />
          Shorten to fit
        </button>
      </div>

      {ranOnce && text.trim() && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 flex flex-col gap-2.5"
        >
          {result.checks.map((check) => {
            const { icon: Icon, color } = STATUS_STYLE[check.status];
            return (
              <div key={check.id} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <Icon size={16} className={`mt-0.5 shrink-0 ${color}`} />
                <div>
                  <div className="text-sm font-medium text-cream">{check.label}</div>
                  <div className="mt-0.5 text-xs leading-relaxed text-smoke">{check.message}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
