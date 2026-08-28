"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/categories";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function CategoryCard({
  category,
  active,
  onSelect,
}: {
  category: Category;
  active: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const Icon = category.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [6, -6]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-6, 6]), { stiffness: 220, damping: 20 });

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onClick={onSelect}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn(
        "glass group relative flex flex-col gap-3 rounded-2xl p-4 text-left transition-colors",
        active
          ? "border-ember-500/60 shadow-glow"
          : "hover:border-white/20"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
          active
            ? "border-ember-500/50 bg-ember-500/10 text-ember-400"
            : "border-white/10 bg-white/5 text-smoke group-hover:text-ember-400"
        )}
      >
        <Icon size={18} strokeWidth={1.6} />
      </div>
      <div>
        <div className="font-display text-sm font-semibold text-cream">{category.title}</div>
        <div className="mt-1 text-xs leading-relaxed text-smoke">{category.desc}</div>
      </div>
      {active && (
        <motion.div
          layoutId="active-pill"
          className="absolute right-3 top-3 h-2 w-2 rounded-full bg-ember-500"
          transition={{ duration: 0.3, ease: EASE }}
        />
      )}
    </motion.button>
  );
}
