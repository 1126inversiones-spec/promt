"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { ConfigForm } from "@/components/config-form";
import { PromptTicket } from "@/components/prompt-ticket";
import { HistoryPanel, type HistoryEntry } from "@/components/history-panel";
import { WizardStepper } from "@/components/wizard-stepper";
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
  const [stepIndex, setStepIndex] = useState(0);

  const activeCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeId) ?? null,
    [activeId]
  );

  const currentPrompt = useMemo(() => {
    if (!activeCategory || !config) return null;
    return buildPrompt(activeCategory, config);
  }, [activeCategory, config]);

  const steps = [
    { id: "select", label: "Pick the effect", completed: !!activeId },
    { id: "configure", label: "Configure your dish", completed: !!config },
    { id: "result", label: "Your prompt", completed: !!currentPrompt },
  ];

  function handleSelect(id: CategoryId) {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) return;
    setActiveId(id);
    setConfig(defaultConfig(cat));
    setStepIndex(1);
  }

  function handleReset() {
    setActiveId(null);
    setConfig(null);
    setStepIndex(0);
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
    handleReset();
  }

  return (
    <main className="min-h-screen">
      <Hero />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {/* Desktop Layout: Two columns */}
        <div className="hidden lg:grid grid-cols-[1.15fr_0.85fr] gap-10">
          <div className="glass rounded-2xl p-8">
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

        {/* Mobile/Tablet Layout: Wizard Stepper */}
        <div className="lg:hidden">
          <WizardStepper
            steps={steps}
            currentStepIndex={stepIndex}
            canPrev={stepIndex > 0}
            canNext={stepIndex < steps.length - 1}
            onNext={() => setStepIndex(stepIndex + 1)}
            onPrev={() => setStepIndex(stepIndex - 1)}
            hideNavigation={stepIndex === steps.length - 1}
          >
            {stepIndex === 0 && (
              <div className="glass rounded-2xl p-6">
                <CategoryGrid activeId={activeId} onSelect={handleSelect} />
              </div>
            )}

            {stepIndex === 1 && config && (
              <div className="glass rounded-2xl p-6">
                <ConfigForm
                  category={activeCategory}
                  config={config}
                  onChange={handleChange}
                  onAdd={() => {
                    handleAdd();
                    setStepIndex(2);
                  }}
                  onReset={handleReset}
                />
              </div>
            )}

            {stepIndex === 2 && currentPrompt && (
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PromptTicket prompt={currentPrompt} orderNumber={history.length} />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="w-full btn-tactile btn-tactile-primary rounded-lg px-4 py-3 text-sm font-semibold"
                >
                  Generate Another Prompt
                </motion.button>

                {history.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <HistoryPanel entries={history} />
                  </motion.div>
                )}
              </div>
            )}
          </WizardStepper>
        </div>
      </section>
    </main>
  );
}
