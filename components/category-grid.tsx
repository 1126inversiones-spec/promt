"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, WandSparkles } from "lucide-react";
import { GROUPS, categoriesForGroup, type GroupId, type CategoryId } from "@/lib/categories";
import type { CustomEffect } from "@/lib/custom-effects";
import { CategoryCard } from "@/components/category-card";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function CategoryGrid({
  activeGroupId,
  activeId,
  activeCustomId,
  customEffects,
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

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-smoke">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember-700 text-ember-400">
          1
        </span>
        {activeGroup ? "Pick the effect for your dish" : "Pick a menu category"}
      </div>

      <AnimatePresence mode="wait">
        {!activeGroup ? (
          <motion.div
            key="groups"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {GROUPS.map((g) => (
              <motion.div key={g.id} variants={item}>
                <CategoryCard
                  icon={g.icon}
                  title={g.title}
                  desc={g.desc}
                  active={false}
                  onSelect={() => onSelectGroup(g.id)}
                />
              </motion.div>
            ))}
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
              {groupCustomEffects.map((entry) => (
                <motion.div key={entry.id} variants={item}>
                  <CategoryCard
                    icon={WandSparkles}
                    title={entry.title}
                    desc="Designer-submitted prompt"
                    active={activeCustomId === entry.id}
                    onSelect={() => onSelectCustom(entry)}
                    badge="Custom"
                    onDelete={canManage ? () => onDeleteCustom(entry.id) : undefined}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
