"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, LayoutGrid, List, Search, WandSparkles, X } from "lucide-react";
import {
  GROUPS,
  CATEGORIES,
  categoriesForGroup,
  groupOf,
  type GroupId,
  type CategoryId,
  type Category,
} from "@/lib/categories";
import type { CustomEffect } from "@/lib/custom-effects";
import { CategoryCard } from "@/components/category-card";
import { CategoryListRow } from "@/components/category-list-row";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
const VIEW_MODE_KEY = "prompt-studio-view-mode";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

type SearchResult =
  | { kind: "built-in"; groupId: GroupId; category: Category }
  | { kind: "custom"; groupId: GroupId; entry: CustomEffect };

export function CategoryGrid({
  activeGroupId,
  activeId,
  activeCustomId,
  customEffects,
  customEffectsLoading,
  canManage,
  onSelectGroup,
  onSelect,
  onSelectCustom,
  onDeleteCustom,
  onBack,
}: {
  activeGroupId: GroupId | null;
  activeId: CategoryId | null;
  activeCustomId: string | null;
  customEffects: CustomEffect[];
  customEffectsLoading: boolean;
  canManage: boolean;
  onSelectGroup: (id: GroupId) => void;
  onSelect: (id: CategoryId) => void;
  onSelectCustom: (entry: CustomEffect) => void;
  onDeleteCustom: (id: string) => void;
  onBack: () => void;
}) {
  const activeGroup = GROUPS.find((g) => g.id === activeGroupId) ?? null;
  const effects = activeGroup ? categoriesForGroup(activeGroup.id) : [];
  const groupCustomEffects = activeGroup
    ? customEffects.filter((e) => e.groupId === activeGroup.id)
    : [];

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(VIEW_MODE_KEY);
    if (saved === "grid" || saved === "list") setViewMode(saved);
  }, []);

  function toggleViewMode() {
    setViewMode((prev) => {
      const next = prev === "grid" ? "list" : "grid";
      window.localStorage.setItem(VIEW_MODE_KEY, next);
      return next;
    });
  }

  const searchResults: SearchResult[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const builtIn: SearchResult[] = CATEGORIES.filter(
      (c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    )
      .map((c) => {
        const g = groupOf(c.id);
        return g ? ({ kind: "built-in", groupId: g.id, category: c } as SearchResult) : null;
      })
      .filter((r): r is SearchResult => r !== null);
    const custom: SearchResult[] = customEffects
      .filter((e) => e.title.toLowerCase().includes(q))
      .map((e) => ({ kind: "custom", groupId: e.groupId, entry: e }) as SearchResult);
    return [...builtIn, ...custom];
  }, [searchQuery, customEffects]);

  function handleSelectResult(result: SearchResult) {
    onSelectGroup(result.groupId);
    if (result.kind === "custom") {
      onSelectCustom(result.entry);
    } else {
      onSelect(result.category.id);
    }
    setSearchQuery("");
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const active = document.activeElement;
      const isTyping =
        active instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName) &&
        active !== searchInputRef.current;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      if (e.key === "Escape") {
        if (document.activeElement === searchInputRef.current && searchQuery) {
          setSearchQuery("");
          searchInputRef.current?.blur();
          return;
        }
        if (!isTyping && activeGroup) {
          onBack();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery, activeGroup, onBack]);

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-base/40 px-3 py-2">
        <Search size={14} className="shrink-0 text-smoke" />
        <input
          ref={searchInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search effects..."
          className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-smoke/60"
        />
        {searchQuery ? (
          <button onClick={() => setSearchQuery("")} className="shrink-0 text-smoke hover:text-cream">
            <X size={14} />
          </button>
        ) : (
          <span className="hidden shrink-0 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-smoke sm:inline">
            {"\u2318K"}
          </span>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-smoke">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember-700 text-ember-400">
            1
          </span>
          {searchQuery
            ? "Search results"
            : activeGroup
              ? "Pick the effect for your dish"
              : "Pick a menu category"}
        </div>
        {activeGroup && !searchQuery && (
          <button
            onClick={toggleViewMode}
            className="flex items-center gap-1 text-smoke transition-colors hover:text-cream"
            aria-label="Toggle view mode"
          >
            {viewMode === "grid" ? <List size={14} /> : <LayoutGrid size={14} />}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {searchQuery ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex flex-col gap-2"
          >
            {searchResults.length === 0 ? (
              <p className="py-6 text-center text-sm text-smoke">No effects match &ldquo;{searchQuery}&rdquo;.</p>
            ) : (
              searchResults.map((r) => {
                const groupTitle = GROUPS.find((g) => g.id === r.groupId)?.title ?? "";
                return (
                  <CategoryListRow
                    key={r.kind === "built-in" ? r.category.id : r.entry.id}
                    icon={r.kind === "built-in" ? r.category.icon : WandSparkles}
                    title={r.kind === "built-in" ? r.category.title : r.entry.title}
                    desc={groupTitle}
                    badge={r.kind === "custom" ? "Custom" : undefined}
                    active={false}
                    onSelect={() => handleSelectResult(r)}
                  />
                );
              })
            )}
          </motion.div>
        ) : !activeGroup ? (
          <motion.div
            key="groups"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {GROUPS.map((g) => {
              const customCount = customEffects.filter((e) => e.groupId === g.id).length;
              const baseCount = categoriesForGroup(g.id).length;
              const meta = customCount > 0 ? `${baseCount} effects \u00b7 ${customCount} custom` : `${baseCount} effects`;
              return (
                <motion.div key={g.id} variants={item}>
                  <CategoryCard
                    icon={g.icon}
                    title={g.title}
                    desc={g.desc}
                    meta={meta}
                    active={false}
                    onSelect={() => onSelectGroup(g.id)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="effects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              onClick={onBack}
              className="mb-4 flex items-center gap-1.5 text-xs text-smoke transition-colors hover:text-cream"
            >
              <ArrowLeft size={13} />
              Back to categories
            </button>

            {viewMode === "grid" ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              >
                {effects.map((cat) => (
                  <motion.div key={cat.id} variants={item}>
                    <CategoryCard
                      icon={cat.icon}
                      title={cat.title}
                      desc={cat.desc}
                      active={activeId === cat.id}
                      onSelect={() => onSelect(cat.id)}
                      previewSrc={cat.previewSrc}
                    />
                  </motion.div>
                ))}
                {customEffectsLoading ? (
                  <>
                    <div className="skeleton animate-shimmer h-[132px] rounded-2xl" />
                    <div className="skeleton animate-shimmer h-[132px] rounded-2xl" />
                  </>
                ) : (
                  groupCustomEffects.map((entry) => (
                    <motion.div key={entry.id} variants={item}>
                      <CategoryCard
                        icon={WandSparkles}
                        title={entry.title}
                        desc={entry.createdBy ? `Added by ${entry.createdBy}` : "Designer-submitted prompt"}
                        active={activeCustomId === entry.id}
                        onSelect={() => onSelectCustom(entry)}
                        badge="Custom"
                        onDelete={canManage ? () => onDeleteCustom(entry.id) : undefined}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-2">
                {effects.map((cat) => (
                  <motion.div key={cat.id} variants={item}>
                    <CategoryListRow
                      icon={cat.icon}
                      title={cat.title}
                      desc={cat.desc}
                      active={activeId === cat.id}
                      onSelect={() => onSelect(cat.id)}
                    />
                  </motion.div>
                ))}
                {customEffectsLoading ? (
                  <>
                    <div className="skeleton animate-shimmer h-[52px] rounded-xl" />
                    <div className="skeleton animate-shimmer h-[52px] rounded-xl" />
                  </>
                ) : (
                  groupCustomEffects.map((entry) => (
                    <motion.div key={entry.id} variants={item}>
                      <CategoryListRow
                        icon={WandSparkles}
                        title={entry.title}
                        desc={entry.createdBy ? `Added by ${entry.createdBy}` : "Designer-submitted prompt"}
                        active={activeCustomId === entry.id}
                        onSelect={() => onSelectCustom(entry)}
                        badge="Custom"
                        onDelete={canManage ? () => onDeleteCustom(entry.id) : undefined}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
