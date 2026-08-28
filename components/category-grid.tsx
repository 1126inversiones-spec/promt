"use client";

import { motion } from "framer-motion";
import { CATEGORIES, type CategoryId } from "@/lib/categories";
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
  activeId,
  onSelect,
}: {
  activeId: CategoryId | null;
  onSelect: (id: CategoryId) => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-smoke">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember-700 text-ember-400">
          1
        </span>
        Pick the effect for your dish
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {CATEGORIES.map((cat) => (
          <motion.div key={cat.id} variants={item}>
            <CategoryCard
              category={cat}
              active={activeId === cat.id}
              onSelect={() => onSelect(cat.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
