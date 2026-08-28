"use client";

import { useMemo, useState } from "react";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { ConfigForm } from "@/components/config-form";
import { PromptTicket } from "@/components/prompt-ticket";
import { HistoryPanel, type HistoryEntry } from "@/components/history-panel";
import {
  CATEGORIES,
  buildPrompt,
  defaultConfig,
  type CategoryId,
  type PromptConfig,
} from "@/lib/categories";

export function PromptGenerator() {
  const [activeId, setActiveId] = useState<CategoryId | null>(null);
  const [config, setConfig] = useState<PromptConfig | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const activeCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeId) ?? null,
    [activeId]
  );

  const currentPrompt = useMemo(() => {
    if (!activeCategory || !config) return null;
    return buildPrompt(activeCategory, config);
  }, [activeCategory, config]);

  function handleSelect(id: CategoryId) {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) return;
    setActiveId(id);
    setConfig(defaultConfig(cat));
  }

  function handleReset() {
    setActiveId(null);
    setConfig(null);
  }

  function handleChange(patch: Partial<PromptConfig>) {
    setConfig((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  function handleAdd() {
    if (!activeCategory || !currentPrompt || !config) return;
    setHistory((prev) => [
      ...prev,
      {
        id: `${activeCategory.id}-${Date.now()}`,
        dish: (config.dish || activeCategory.sampleDish).trim(),
        categoryTitle: activeCategory.title,
        prompt: currentPrompt,
      },
    ]);
  }

  return (
    <main className="min-h-screen">
      <Hero />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="glass rounded-2xl p-6 md:p-8">
            <CategoryGrid activeId={activeId} onSelect={handleSelect} />
            {config && (
              <ConfigForm
                category={activeCategory}
                config={config}
                onChange={handleChange}
                onAdd={handleAdd}
                onReset={handleReset}
              />
            )}
          </div>

          <div>
            <PromptTicket prompt={currentPrompt} orderNumber={history.length + 1} />
            <HistoryPanel entries={history} />
          </div>
        </div>
      </section>
    </main>
  );
}
