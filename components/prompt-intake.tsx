"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  WandSparkles,
  Scissors,
  BookmarkPlus,
  Check,
  LogIn,
  LogOut,
} from "lucide-react";
import { validatePrompt, trimToLimit, LENGTH_TARGET, type CheckStatus } from "@/lib/validate-prompt";
import { GROUPS, type GroupId } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { NeuralBackground } from "@/components/neural-bg";
import type { User } from "firebase/auth";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const STATUS_STYLE: Record<CheckStatus, { icon: typeof CheckCircle2; color: string }> = {
  pass: { icon: CheckCircle2, color: "text-emerald-400" },
  warn: { icon: AlertTriangle, color: "text-amber-400" },
  fail: { icon: XCircle, color: "text-red-400" },
};

export function PromptIntake({
  user,
  onSignIn,
  onSignOut,
  onSave,
}: {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onSave: (groupId: GroupId, title: string, prompt: string) => Promise<void>;
}) {
  const [text, setText] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [title, setTitle] = useState("");
  const [groupId, setGroupId] = useState<GroupId>(GROUPS[0].id);
  const [justSaved, setJustSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const result = useMemo(() => validatePrompt(text), [text]);
  const passCount = result.checks.filter((c) => c.status === "pass").length;
  const totalCount = result.checks.length;
  const hasFail = result.checks.some((c) => c.status === "fail");

  function handleOptimize() {
    setText((prev) => trimToLimit(prev, LENGTH_TARGET.max));
  }

  function handleSave() {
    if (!text.trim() || saving) return;
    setSaving(true);
    setSaveError(null);
    onSave(groupId, title, text.trim())
      .then(() => {
        setJustSaved(true);
        setShowSaveForm(false);
        setTimeout(() => setJustSaved(false), 2200);
        setText("");
        setTitle("");
      })
      .catch(() => {
        setSaveError("Couldn't save — check your connection and try again.");
      })
      .finally(() => setSaving(false));
  }

  const scoreColor = totalCount === 0 ? "text-smoke" : hasFail ? "text-red-400" : passCount === totalCount ? "text-emerald-400" : "text-amber-400";

  return (
    <div className="depth-card relative overflow-hidden rounded-2xl p-5">
      <div className="depth-sheen" aria-hidden="true" />
      <NeuralBackground />
      <div className="relative z-10">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember-700 text-ember-400">
              <WandSparkles size={11} />
            </span>
            Prompt intake
          </div>
          <div className="flex items-center gap-2">
            {text.trim() && (
              <span className={cn("font-mono text-[11px] font-semibold", scoreColor)}>
                {passCount}/{totalCount}
              </span>
            )}
            {user ? (
              <button
                onClick={onSignOut}
                title={user.email ?? "Sign out"}
                className="flex items-center gap-1 text-[10px] text-smoke transition-colors hover:text-cream"
              >
                <LogOut size={11} />
              </button>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[10px] text-smoke transition-colors hover:border-ember-500/50 hover:text-ember-400"
              >
                <LogIn size={11} />
                Sign in
              </button>
            )}
          </div>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-smoke">
          Paste a designer's prompt to audit it, then save it straight into the library.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste a prompt here..."
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-base/60 px-3 py-2.5 font-mono text-[11.5px] text-cream outline-none transition-all placeholder:text-smoke/60 focus:border-ember-500/60 focus:shadow-glow"
        />

        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[10px] text-smoke">{result.charCount} chars</span>
          <button
            onClick={handleOptimize}
            disabled={result.charCount <= LENGTH_TARGET.max}
            className="flex items-center gap-1 text-[11px] text-ember-400 transition-colors hover:text-ember-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Scissors size={11} />
            Shorten to fit
          </button>
        </div>

        <AnimatePresence>
          {text.trim() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden"
            >
              <motion.div
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                initial="hidden"
                animate="show"
                className="mt-3 flex flex-col gap-1.5"
              >
                {result.checks.map((check) => {
                  const { icon: Icon, color } = STATUS_STYLE[check.status];
                  return (
                    <motion.div
                      key={check.id}
                      variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                      className="flex items-start gap-2"
                    >
                      <Icon size={13} className={cn("mt-0.5 shrink-0", color)} />
                      <div>
                        <span className="text-[11.5px] text-smoke">{check.label}</span>
                        {check.status !== "pass" && (
                          <p className="mt-0.5 text-[10.5px] leading-relaxed text-smoke/70">
                            {check.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="mt-3">
                {!user ? (
                  <button
                    onClick={onSignIn}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-smoke transition-colors hover:border-ember-500/50 hover:text-ember-400"
                  >
                    <LogIn size={13} />
                    Sign in to save this to the library
                  </button>
                ) : !showSaveForm ? (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowSaveForm(true)}
                    className="btn-tactile btn-tactile-primary flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold"
                  >
                    <BookmarkPlus size={13} />
                    Save to library
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2 rounded-lg border border-white/10 bg-base/40 p-2.5"
                  >
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Short title for this prompt"
                      className="w-full rounded-md border border-white/10 bg-base/60 px-2.5 py-1.5 text-xs text-cream outline-none placeholder:text-smoke/60 focus:border-ember-500/60"
                    />
                    <select
                      value={groupId}
                      onChange={(e) => setGroupId(e.target.value as GroupId)}
                      className="w-full rounded-md border border-white/10 bg-base/60 px-2.5 py-1.5 text-xs text-cream outline-none focus:border-ember-500/60"
                    >
                      {GROUPS.map((g) => (
                        <option key={g.id} value={g.id} className="bg-base">
                          {g.title}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-tactile btn-tactile-primary rounded-md px-3 py-1.5 text-xs font-semibold disabled:cursor-wait disabled:opacity-60"
                    >
                      {saving ? "Saving\u2026" : `Add card to ${GROUPS.find((g) => g.id === groupId)?.title}`}
                    </button>
                    {saveError && (
                      <p className="text-[11px] leading-relaxed text-red-400">{saveError}</p>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {justSaved && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400"
            >
              <Check size={13} />
              Added to the library.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
