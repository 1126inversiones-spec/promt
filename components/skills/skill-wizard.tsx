"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  ArrowRight,
  ArrowLeft,
  Download,
  BookmarkPlus,
  Check,
  Copy,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import {
  TASK_TYPES,
  emptySkillDraft,
  buildSkillMarkdown,
  slugify,
  type SkillDraft,
} from "@/lib/skills";
import { validateSkillDraft, type CheckStatus } from "@/lib/validate-skill";
import { DynamicListField } from "@/components/skills/dynamic-list-field";
import { cn } from "@/lib/utils";
import type { User } from "firebase/auth";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const STATUS_STYLE: Record<CheckStatus, { icon: typeof CheckCircle2; color: string }> = {
  pass: { icon: CheckCircle2, color: "text-emerald-400" },
  warn: { icon: AlertTriangle, color: "text-amber-400" },
  fail: { icon: XCircle, color: "text-red-400" },
};

const fieldBase =
  "w-full rounded-lg border border-white/10 bg-base/60 px-3.5 py-2.5 text-sm text-cream outline-none transition-all placeholder:text-smoke/60 focus:border-ember-500/60 focus:shadow-glow";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.05em] text-ember-400/90">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] leading-relaxed text-smoke">{hint}</p>}
    </div>
  );
}

export function SkillWizard({
  user,
  onSaveToLibrary,
  loadTemplate,
  onTemplateConsumed,
}: {
  user: User | null;
  onSaveToLibrary: (draft: SkillDraft) => Promise<void>;
  loadTemplate?: SkillDraft | null;
  onTemplateConsumed?: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [draft, setDraft] = useState<SkillDraft>(emptySkillDraft());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (loadTemplate) {
      setDraft(loadTemplate);
      setStep(1);
      setSaved(false);
      setSaveError(null);
      onTemplateConsumed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTemplate]);

  const typeConfig = TASK_TYPES.find((t) => t.id === draft.taskType) ?? TASK_TYPES[0];
  const markdown = useMemo(() => buildSkillMarkdown(draft), [draft]);
  const checks = useMemo(() => validateSkillDraft(draft), [draft]);

  function update(patch: Partial<SkillDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function updateTypeField(fieldId: string, value: string) {
    setDraft((prev) => ({ ...prev, typeSpecific: { ...prev.typeSpecific, [fieldId]: value } }));
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(draft.name)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  function handleSaveToLibrary() {
    if (saving) return;
    setSaving(true);
    setSaveError(null);
    onSaveToLibrary(draft)
      .then(() => setSaved(true))
      .catch(() => setSaveError("Couldn't save \u2014 check your connection and try again."))
      .finally(() => setSaving(false));
  }

  function handleStartOver() {
    setDraft(emptySkillDraft());
    setStep(1);
    setSaved(false);
    setSaveError(null);
  }

  const canGoToStep2 = draft.name.trim().length > 0 && draft.trigger.trim().length > 0;

  return (
    <div id="skill-wizard" className="glass rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-smoke">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember-700 text-ember-400">
          <ClipboardList size={12} />
        </span>
        Step {step} of 4
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
            <h2 className="mb-1 font-display text-xl font-semibold text-cream">What's this skill for?</h2>
            <p className="mb-6 text-sm text-smoke">Start with the basics \u2014 what to call it, and exactly when Claude should use it.</p>

            <Field label="Skill name">
              <input
                className={fieldBase}
                value={draft.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="e.g. Weekly content KPI report"
              />
            </Field>

            <Field
              label="When should Claude use this, on its own?"
              hint="This is the single most important field. Be specific \u2014 \u201cwhen asked for the weekly content report\u201d works; \u201creports\u201d does not."
            >
              <textarea
                className={cn(fieldBase, "min-h-[90px] resize-y")}
                value={draft.trigger}
                onChange={(e) => update({ trigger: e.target.value })}
                placeholder="Use this when asked to..."
              />
            </Field>

            <Field label="What kind of task is this?">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {TASK_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => update({ taskType: t.id })}
                    className={cn(
                      "depth-card relative rounded-xl p-3 text-left transition-colors",
                      draft.taskType === t.id ? "depth-card-active" : "hover:border-white/15"
                    )}
                  >
                    {draft.taskType === t.id && (
                      <CheckCircle2 size={14} className="absolute right-2.5 top-2.5 text-ember-400" />
                    )}
                    <div className="pr-4 font-display text-[13px] font-semibold text-cream">{t.label}</div>
                    <div className="mt-0.5 text-[11px] leading-relaxed text-smoke">{t.desc}</div>
                  </button>
                ))}
              </div>
            </Field>

            <div className="mt-2 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!canGoToStep2}
                className="btn-tactile btn-tactile-primary flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
            <h2 className="mb-1 font-display text-xl font-semibold text-cream">{typeConfig.label} details</h2>
            <p className="mb-6 text-sm text-smoke">A few questions specific to this type of task.</p>

            {typeConfig.fields.map((f) => (
              <Field key={f.id} label={f.label}>
                <input
                  className={fieldBase}
                  value={draft.typeSpecific[f.id] ?? ""}
                  onChange={(e) => updateTypeField(f.id, e.target.value)}
                  placeholder={f.placeholder}
                />
              </Field>
            ))}

            <div className="mt-2 flex justify-between">
              <button onClick={() => setStep(1)} className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm">
                <ArrowLeft size={14} />
                Back
              </button>
              <button onClick={() => setStep(3)} className="btn-tactile btn-tactile-primary flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold">
                Continue
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
            <h2 className="mb-1 font-display text-xl font-semibold text-cream">The procedure</h2>
            <p className="mb-6 text-sm text-smoke">This is what Claude will actually follow every time \u2014 be concrete.</p>

            <DynamicListField
              label="Step-by-step procedure"
              hint="Write it as instructions to Claude, in order."
              values={draft.steps}
              onChange={(steps) => update({ steps })}
              placeholder="e.g. Count prompts generated per category for the date range"
            />

            <DynamicListField
              label="Information needed each time"
              hint="What should Claude ask for if it isn't provided?"
              values={draft.requiredInputs}
              onChange={(requiredInputs) => update({ requiredInputs })}
              placeholder="e.g. The date range to cover"
            />

            <Field label="Output format" hint="A table, an email, a checklist, a short report...">
              <textarea
                className={cn(fieldBase, "min-h-[70px] resize-y")}
                value={draft.outputFormat}
                onChange={(e) => update({ outputFormat: e.target.value })}
                placeholder="Describe the shape of the result..."
              />
            </Field>

            <Field label="Example of a good output" hint="A real example teaches Claude more than instructions alone.">
              <textarea
                className={cn(fieldBase, "min-h-[100px] resize-y")}
                value={draft.goodExample}
                onChange={(e) => update({ goodExample: e.target.value })}
                placeholder="Paste or write an example of the ideal result..."
              />
            </Field>

            <Field label="Example of what to avoid (optional)">
              <textarea
                className={cn(fieldBase, "min-h-[70px] resize-y")}
                value={draft.badExample}
                onChange={(e) => update({ badExample: e.target.value })}
                placeholder="Optional \u2014 a bad example, and why it's bad..."
              />
            </Field>

            <DynamicListField
              label="Common mistakes to avoid"
              values={draft.commonMistakes}
              onChange={(commonMistakes) => update({ commonMistakes })}
              placeholder="e.g. Don't invent numbers if data wasn't provided"
            />

            <div className="mt-2 flex justify-between">
              <button onClick={() => setStep(2)} className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm">
                <ArrowLeft size={14} />
                Back
              </button>
              <button onClick={() => setStep(4)} className="btn-tactile btn-tactile-primary flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold">
                Review
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
            <h2 className="mb-1 font-display text-xl font-semibold text-cream">Review & save</h2>
            <p className="mb-5 text-sm text-smoke">Here's what Claude will read. Fix anything flagged below, or save it as-is.</p>

            <div className="mb-5 flex flex-col gap-2">
              {checks.map((c) => {
                const { icon: Icon, color } = STATUS_STYLE[c.status];
                return (
                  <div key={c.id} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <Icon size={16} className={cn("mt-0.5 shrink-0", color)} />
                    <div>
                      <div className="text-sm font-medium text-cream">{c.label}</div>
                      <div className="mt-0.5 text-xs leading-relaxed text-smoke">{c.message}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mb-5 max-h-72 overflow-y-auto rounded-lg border border-white/10 bg-base/60 p-3 font-mono text-[11px] leading-relaxed text-smoke">
              <pre className="whitespace-pre-wrap">{markdown}</pre>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button onClick={() => setStep(3)} className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm">
                <ArrowLeft size={14} />
                Back
              </button>
              <button onClick={handleCopy} className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy markdown"}
              </button>
              <button onClick={handleDownload} className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm">
                <Download size={14} />
                Download .md
              </button>
              {user ? (
                !saved ? (
                  <button
                    onClick={handleSaveToLibrary}
                    disabled={saving}
                    className="btn-tactile btn-tactile-primary flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold disabled:cursor-wait disabled:opacity-60"
                  >
                    <BookmarkPlus size={14} />
                    {saving ? "Saving\u2026" : "Save to my library"}
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400">
                    <Check size={14} />
                    Saved to your library
                  </span>
                )
              ) : (
                <span className="flex items-center rounded-lg border border-white/10 px-4 py-2.5 text-xs text-smoke">
                  Sign in above to save this to your library
                </span>
              )}
            </div>
            {saveError && <p className="mt-2 text-[11px] text-red-400">{saveError}</p>}

            <button onClick={handleStartOver} className="mt-4 text-xs text-smoke transition-colors hover:text-cream">
              Start a new skill
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
