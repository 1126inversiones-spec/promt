"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check, Download, ChevronUp, ArrowRight } from "lucide-react";
import { SKILL_TEMPLATES, type SkillTemplate } from "@/lib/skill-templates";
import { TASK_TYPES, buildSkillMarkdown, type SkillDraft } from "@/lib/skills";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function SkillTemplatesSection({ onUseTemplate }: { onUseTemplate: (draft: SkillDraft) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openTemplate = SKILL_TEMPLATES.find((t) => t.id === openId) ?? null;

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-smoke">
        Ready-made templates
      </div>
      <p className="mb-5 text-sm text-smoke">
        Five skills already written for eMenu's most common repetitive tasks. Open one to see the
        pattern, then use it as a starting point \u2014 every field loads into the wizard below, fully
        editable, so you can plug in your own numbers, rate, or client details.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SKILL_TEMPLATES.map((t) => {
          const typeLabel = TASK_TYPES.find((tt) => tt.id === t.taskType)?.label ?? t.taskType;
          const isOpen = openId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setOpenId(isOpen ? null : t.id)}
              className={cn(
                "depth-card rounded-xl p-4 text-left transition-colors",
                isOpen ? "depth-card-active" : "hover:border-white/15"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-mono text-[10px] uppercase tracking-wide text-ember-400">{typeLabel}</div>
                {isOpen && <ChevronUp size={14} className="shrink-0 text-ember-400" />}
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-cream">{t.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-smoke">{t.summary}</div>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {openTemplate && (
          <motion.div
            key={openTemplate.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <TemplatePreview template={openTemplate} onUseTemplate={onUseTemplate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TemplatePreview({
  template,
  onUseTemplate,
}: {
  template: SkillTemplate;
  onUseTemplate: (draft: SkillDraft) => void;
}) {
  const [copied, setCopied] = useState(false);
  const markdown = buildSkillMarkdown(template.draft);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-base/40">
      <div className="max-h-72 overflow-y-auto p-4">
        <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-smoke">{markdown}</pre>
      </div>
      <div className="flex flex-wrap gap-2.5 border-t border-white/10 p-3">
        <button
          onClick={() => onUseTemplate(template.draft)}
          className="btn-tactile btn-tactile-primary flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold"
        >
          Use as starting point
          <ArrowRight size={13} />
        </button>
        <button onClick={handleCopy} className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs">
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy markdown"}
        </button>
        <button onClick={handleDownload} className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs">
          <Download size={13} />
          Download .md
        </button>
      </div>
    </div>
  );
}
