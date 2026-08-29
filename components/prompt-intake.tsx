"use client";

import { useEffect, useMemo, useState } from "react";
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
  ArrowLeft,
  Info,
} from "lucide-react";
import { validatePrompt, trimToLimit, LENGTH_TARGET, type CheckStatus } from "@/lib/validate-prompt";
import { GROUPS, type GroupId } from "@/lib/categories";
import {
  suggestedTitleFor,
  suggestUniqueTitle,
  type CustomEffect,
} from "@/lib/custom-effects";
import { cn } from "@/lib/utils";
import { NeuralBackground } from "@/components/neural-bg";
import type { User } from "firebase/auth";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const STATUS_STYLE: Record<CheckStatus, { icon: typeof CheckCircle2; color: string }> = {
  pass: { icon: CheckCircle2, color: "text-emerald-400" },
  warn: { icon: AlertTriangle, color: "text-amber-400" },
  fail: { icon: XCircle, color: "text-red-400" },
};

type SaveStep = "closed" | "form" | "confirm";

export function PromptIntake({
  user,
  onSignIn,
  onSignOut,
  onSave,
  customEffects,
}: {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onSave: (groupId: GroupId, title: string, prompt: string) => Promise<void>;
  customEffects: CustomEffect[];
}) {
  const [text, setText] = useState("");
  const [saveStep, setSaveStep] = useState<SaveStep>("closed");
  const [title, setTitle] = useState("");
  const [groupId, setGroupId] = useState<GroupId>(GROUPS[0].id);
  const [resolvedTitle, setResolvedTitle] = useState("");
  const [wasRenamed, setWasRenamed] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (cooldownUntil <= Date.now()) return;
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  const cooldownSecondsLeft = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const inCooldown = cooldownSecondsLeft > 0;

  const result = useMemo(() => validatePrompt(text), [text]);
  const passCount = result.checks.filter((c) => c.status === "pass").length;
  const totalCount = result.checks.length;
  const hasFail = result.checks.some((c) => c.status === "fail");

  const activeGroup = GROUPS.find((g) => g.id === groupId) ?? GROUPS[0];

  function handleOptimize() {
    setText((prev) => trimToLimit(prev, LENGTH_TARGET.max));
  }

  function openForm() {
    if (!title.trim()) {
      setTitle(suggestedTitleFor(activeGroup.title));
    }
    setSaveStep("form");
  }

  function handleReview() {
    const existingTitles = customEffects.filter((e) => e.groupId === groupId).map((e) => e.title);
    const base = title.trim() || suggestedTitleFor(activeGroup.title);
    const unique = suggestUniqueTitle(base, existingTitles);
    setResolvedTitle(unique);
    setWasRenamed(unique !== base);
    setSaveStep("confirm");
  }

  function handleConfirmSave() {
    if (!text.trim() || saving) return;
    setSaving(true);
    setSaveError(null);
    onSave(groupId, resolvedTitle, text.trim())
      .then(() => {
        setJustSaved(true);
        setSaveStep("closed");
        setTimeout(() => setJustSaved(false), 2200);
        setText("");
        setTitle("");
        setNow(Date.now());
        setCooldownUntil(Date.now() + 5000);
      })
      .catch(() => {
        setSaveError("Couldn't save — check your connection and try again.");
      })
      .finally(() => setSaving(false));
  }

  const scoreColor =
    totalCount === 0
      ? "text-smoke"
      : hasFail
        ? "text-red-400"
        : passCount === totalCount
          ? "text-emerald-400"
          : "text-amber-400";

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
              {saveStep !== "confirm" && (
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
              )}

              <div className="mt-3">
                {!user ? (
                  <button
                    onClick={onSignIn}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-smoke transition-colors hover:border-ember-500/50 hover:text-ember-400"
                  >
                    <LogIn size={13} />
                    Sign in to save this to the library
                  </button>
                ) : saveStep === "closed" ? (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openForm}
                    disabled={inCooldown}
                    className="btn-tactile btn-tactile-primary flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <BookmarkPlus size={13} />
                    {inCooldown ? `Wait ${cooldownSecondsLeft}s\u2026` : "Save to library"}
                  </motion.button>
                ) : saveStep === "form" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2 rounded-lg border border-white/10 bg-base/40 p-2.5"
                  >
                    <label className="font-mono text-[10px] uppercase tracking-wide text-smoke">
                      Title (suggested — feel free to edit)
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Short title for this prompt"
                      className="w-full rounded-md border border-white/10 bg-base/60 px-2.5 py-1.5 text-xs text-cream outline-none placeholder:text-smoke/60 focus:border-ember-500/60"
                    />
                    <label className="font-mono text-[10px] uppercase tracking-wide text-smoke">
                      Category
                    </label>
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
                      onClick={handleReview}
                      className="btn-tactile btn-tactile-primary rounded-md px-3 py-1.5 text-xs font-semibold"
                    >
                      Review before saving
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2.5 rounded-lg border border-white/10 bg-base/40 p-3"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wide text-smoke">
                      Confirm before saving
                    </div>

                    <div>
                      <div className="text-[10px] text-smoke">Title</div>
                      <div className="text-xs font-semibold text-cream">{resolvedTitle}</div>
                      {wasRenamed && (
                        <div className="mt-1 flex items-start gap-1.5 rounded-md bg-amber-500/10 px-2 py-1.5 text-[10.5px] leading-relaxed text-amber-300">
                          <Info size={12} className="mt-0.5 shrink-0" />
                          <span>
                            A prompt named &ldquo;{title.trim() || suggestedTitleFor(activeGroup.title)}&rdquo;
                            already exists in this category, so this was renamed to keep titles unique.
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-[10px] text-smoke">Category</div>
                      <div className="text-xs text-cream">{activeGroup.title}</div>
                    </div>

                    <div>
                      <div className="mb-1 text-[10px] text-smoke">Prompt</div>
                      <div className="max-h-24 overflow-y-auto rounded-md border border-white/10 bg-base/60 p-2 font-mono text-[10.5px] leading-relaxed text-smoke">
                        {text.trim()}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSaveStep("form")}
                        className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs"
                      >
                        <ArrowLeft size={12} />
                        Back
                      </button>
                      <button
                        onClick={handleConfirmSave}
                        disabled={saving}
                        className="btn-tactile btn-tactile-primary flex-1 rounded-md px-3 py-1.5 text-xs font-semibold disabled:cursor-wait disabled:opacity-60"
                      >
                        {saving ? "Saving\u2026" : "Confirm & save"}
                      </button>
                    </div>
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
