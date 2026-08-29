"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check, Download, X } from "lucide-react";
import { SKILL_TEMPLATES, type SkillTemplate } from "@/lib/skill-templates";
import { TASK_TYPES } from "@/lib/skills";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function SkillTemplatesSection() {
  const [open, setOpen] = useState<SkillTemplate | null>(null);

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-smoke">
        Ready-made templates
      </div>
      <p className="mb-5 text-sm text-smoke">
        Four skills already written for eMenu's most common repetitive tasks. Use them as-is, or open
        one to see the pattern before building your own.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SKILL_TEMPLATES.map((t) => {
          const typeLabel = TASK_TYPES.find((tt) => tt.id === t.taskType)?.label ?? t.taskType;
          return (
            <button
              key={t.id}
              onClick={() => setOpen(t)}
              className="depth-card rounded-xl p-4 text-left transition-colors hover:border-white/15"
            >
              <div className="font-mono text-[10px] uppercase tracking-wide text-ember-400">{typeLabel}</div>
              <div className="mt-1 font-display text-sm font-semibold text-cream">{t.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-smoke">{t.summary}</div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {open && <TemplatePreview template={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function TemplatePreview({ template, onClose }: { template: SkillTemplate; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(template.markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  function handleDownload() {
    const blob = new Blob([template.markdown], { type: "text/markdown;charset=utf-8" });
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="depth-card max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="font-display text-base font-semibold text-cream">{template.title}</div>
          <button onClick={onClose} className="text-smoke transition-colors hover:text-cream">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-4">
          <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-smoke">
            {template.markdown}
          </pre>
        </div>
        <div className="flex gap-2.5 border-t border-white/10 p-4">
          <button onClick={handleCopy} className="btn-tactile btn-tactile-dark flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy markdown"}
          </button>
          <button onClick={handleDownload} className="btn-tactile btn-tactile-primary flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold">
            <Download size={14} />
            Download .md
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
