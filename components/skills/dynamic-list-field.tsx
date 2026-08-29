"use client";

import { Plus, X } from "lucide-react";

export function DynamicListField({
  label,
  hint,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  function updateAt(i: number, val: string) {
    const next = [...values];
    next[i] = val;
    onChange(next);
  }

  function removeAt(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }

  function add() {
    onChange([...values, ""]);
  }

  return (
    <div className="mb-5">
      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.05em] text-ember-400/90">
        {label}
      </label>
      {hint && <p className="mb-2 text-[11px] leading-relaxed text-smoke">{hint}</p>}
      <div className="flex flex-col gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-5 shrink-0 text-right font-mono text-[11px] text-smoke">{i + 1}.</span>
            <input
              value={v}
              onChange={(e) => updateAt(i, e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border border-white/10 bg-base/60 px-3 py-2 text-sm text-cream outline-none transition-colors placeholder:text-smoke/60 focus:border-ember-500/60"
            />
            {values.length > 1 && (
              <button
                onClick={() => removeAt(i)}
                aria-label="Remove"
                className="shrink-0 text-smoke transition-colors hover:text-red-400"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-2 flex items-center gap-1 text-xs text-ember-400 transition-colors hover:text-ember-300">
        <Plus size={12} />
        Add
      </button>
    </div>
  );
}
