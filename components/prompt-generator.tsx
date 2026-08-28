"use client";

import { useEffect, useMemo, useState } from "react";
import { Hero } from "@/components/hero";
import { PromptIntake } from "@/components/prompt-intake";
import { CategoryGrid } from "@/components/category-grid";
import { ConfigForm } from "@/components/config-form";
import { PromptTicket } from "@/components/prompt-ticket";
import { HistoryPanel, type HistoryEntry } from "@/components/history-panel";
import {
  CATEGORIES,
  buildPrompt,
  defaultConfig,
  type CategoryId,
  type GroupId,
  type PromptConfig,
} from "@/lib/categories";
import {
  subscribeToCustomEffects,
  addCustomEffect,
  removeCustomEffect,
  type CustomEffect,
} from "@/lib/custom-effects";
import { subscribeToAuth, signInWithGoogle, signOutUser } from "@/lib/auth";
import type { User } from "firebase/auth";
import { motion } from "framer-motion";
import { RotateCcw, PlusCircle } from "lucide-react";

export function PromptGenerator() {
  const [activeGroupId, setActiveGroupId] = useState<GroupId | null>(null);
  const [activeId, setActiveId] = useState<CategoryId | null>(null);
  const [activeCustomId, setActiveCustomId] = useState<string | null>(null);
  const [config, setConfig] = useState<PromptConfig | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [customEffects, setCustomEffects] = useState<CustomEffect[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToCustomEffects(setCustomEffects);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(setUser);
    return unsubscribe;
  }, []);

  const activeCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeId) ?? null,
    [activeId]
  );

  const activeCustom = useMemo(
    () => customEffects.find((e) => e.id === activeCustomId) ?? null,
    [customEffects, activeCustomId]
  );

  const currentPrompt = useMemo(() => {
    if (activeCustom) return activeCustom.prompt;
    if (!activeCategory || !config) return null;
    return buildPrompt(activeCategory, config);
  }, [activeCustom, activeCategory, config]);

  const currentDishLabel = activeCustom
    ? activeCustom.title
    : (config?.dish || activeCategory?.sampleDish || "").trim();

  const currentCategoryTitle = activeCustom ? "Custom prompt" : activeCategory?.title ?? "";

  function handleSelectGroup(id: GroupId) {
    setActiveGroupId(id);
    setActiveId(null);
    setActiveCustomId(null);
    setConfig(null);
  }

  function handleSelectEffect(id: CategoryId) {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) return;
    setActiveId(id);
    setActiveCustomId(null);
    setConfig(defaultConfig(cat));
  }

  function handleSelectCustom(entry: CustomEffect) {
    setActiveCustomId(entry.id);
    setActiveId(null);
    setConfig(null);
  }

  function handleDeleteCustom(id: string) {
    if (activeCustomId === id) {
      setActiveCustomId(null);
    }
    removeCustomEffect(id).catch((err) => {
      console.error("Failed to delete custom effect:", err);
      alert("You don't have permission to delete this prompt.");
    });
  }

  function handleBackToGroups() {
    setActiveGroupId(null);
    setActiveId(null);
    setActiveCustomId(null);
    setConfig(null);
  }

  function handleReset() {
    setActiveId(null);
    setActiveCustomId(null);
    setConfig(null);
  }

  function handleChange(patch: Partial<PromptConfig>) {
    setConfig((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  function handleAdd() {
    if (!currentPrompt) return;
    setHistory((prev) => [
      ...prev,
      {
        id: `${activeCustomId ?? activeCategory?.id ?? "entry"}-${Date.now()}`,
        dish: currentDishLabel || "Untitled",
        categoryTitle: currentCategoryTitle,
        prompt: currentPrompt,
      },
    ]);
  }

  function handleSaveToLibrary(groupId: GroupId, title: string, prompt: string) {
    return addCustomEffect(groupId, title, prompt);
  }

  return (
    <main className="min-h-screen">
      <Hero>
        <PromptIntake user={user} onSignIn={signInWithGoogle} onSignOut={signOutUser} onSave={handleSaveToLibrary} />
      </Hero>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="glass rounded-2xl p-6 md:p-8">
            <CategoryGrid
              activeGroupId={activeGroupId}
              activeId={activeId}
              activeCustomId={activeCustomId}
              customEffects={customEffects}
              canManage={!!user}
              onSelectGroup={handleSelectGroup}
              onSelect={handleSelectEffect}
              onSelectCustom={handleSelectCustom}
              onDeleteCustom={handleDeleteCustom}
              onBack={handleBackToGroups}
            />

            {config && (
              <ConfigForm
                category={activeCategory}
                config={config}
                onChange={handleChange}
                onAdd={handleAdd}
                onReset={handleReset}
              />
            )}

            {activeCustom && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-smoke">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember-700 text-ember-400">
                    2
                  </span>
                  Custom prompt selected
                </div>
                <p className="mb-4 text-sm text-smoke">
                  This is a designer-submitted prompt from the library. It's used exactly as
                  written — copy it from the ticket, or add it to your session list below.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdd}
                    className="btn-tactile btn-tactile-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
                  >
                    <PlusCircle size={16} strokeWidth={2} />
                    Add to my list
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleReset}
                    className="btn-tactile btn-tactile-dark flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
                  >
                    <RotateCcw size={14} strokeWidth={2} />
                    Choose another effect
                  </motion.button>
                </div>
              </motion.div>
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
