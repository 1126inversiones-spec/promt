"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { FORMATS, DURATIONS, type Category, type PromptConfig } from "@/lib/categories";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const fieldBase =
  "w-full rounded-lg border border-white/10 bg-base/60 px-3.5 py-2.5 text-sm text-cream outline-none transition-all placeholder:text-smoke/60 focus:border-ember-500/60 focus:shadow-glow";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.05em] text-ember-400/90">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] leading-relaxed text-smoke">{hint}</p>}
    </div>
  );
}

export function ConfigForm({
  category,
  config,
  onChange,
  onAdd,
  onReset,
}: {
  category: Category | null;
  config: PromptConfig;
  onChange: (patch: Partial<PromptConfig>) => void;
  onAdd: () => void;
  onReset: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {category && (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-8"
        >
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-smoke">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember-700 text-ember-400">
              2
            </span>
            Configure your dish
          </div>

          <Field label="Dish name / description">
            <input
              className={fieldBase}
              value={config.dish}
              placeholder={category.sampleDish}
              onChange={(e) => onChange({ dish: e.target.value })}
            />
          </Field>

          {category.ingredient && (
            <Field label={category.ingredient.label}>
              <input
                className={fieldBase}
                value={config.ingredient}
                placeholder={category.ingredient.placeholder}
                onChange={(e) => onChange({ ingredient: e.target.value })}
              />
            </Field>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Format">
              <select
                className={cn(fieldBase, "appearance-none")}
                value={config.format}
                onChange={(e) => onChange({ format: e.target.value })}
              >
                {FORMATS.map((f) => (
                  <option key={f.value} value={f.value} className="bg-base">
                    {f.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Duration">
              <select
                className={cn(fieldBase, "appearance-none")}
                value={config.duration}
                onChange={(e) => onChange({ duration: e.target.value })}
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d} className="bg-base">
                    {d} seconds
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Background / mood" hint="Suggested based on the effect — feel free to change it.">
            <input
              className={fieldBase}
              value={config.background}
              onChange={(e) => onChange({ background: e.target.value })}
            />
          </Field>

          <Field label="Extra detail (optional)">
            <textarea
              className={cn(fieldBase, "min-h-[70px] resize-y")}
              value={config.extra}
              placeholder="e.g. dark wood table, camera slowly rotating..."
              onChange={(e) => onChange({ extra: e.target.value })}
            />
          </Field>

          <div className="mt-2 flex flex-wrap gap-2.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onAdd}
              className="btn-tactile btn-tactile-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
            >
              <PlusCircle size={16} strokeWidth={2} />
              Add to my list
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onReset}
              className="btn-tactile btn-tactile-dark flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
            >
              <RotateCcw size={14} strokeWidth={2} />
              Choose another effect
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
