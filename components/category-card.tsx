"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function CategoryCard({
  icon: Icon,
  title,
  desc,
  active,
  onSelect,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  active: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [6, -6]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-6, 6]), { stiffness: 220, damping: 20 });

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    x.set(relX - rect.width / 2);
    y.set(relY - rect.height / 2);
    ref.current?.style.setProperty("--mouse-x", `${relX}px`);
    ref.current?.style.setProperty("--mouse-y", `${relY}px`);
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
        "depth-card group relative flex flex-col gap-3 rounded-2xl p-4 text-left transition-colors",
        active ? "border-ember-500/60 shadow-glow" : "hover:border-white/15"
      )}
    >
      <div className="depth-sheen" aria-hidden="true" />
      <div
        className={cn(
          "relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
          active
            ? "border-ember-500/50 bg-ember-500/10 text-ember-400"
            : "border-white/10 bg-white/5 text-smoke group-hover:text-ember-400"
        )}
      >
        <Icon size={18} strokeWidth={1.6} />
      </div>
      <div className="relative z-10">
        <div className="font-display text-sm font-semibold text-cream">{title}</div>
        <div className="mt-1 text-xs leading-relaxed text-smoke">{desc}</div>
      </div>
      {active && (
        <motion.div
          layoutId="active-pill"
          className="absolute right-3 top-3 z-10 h-2 w-2 rounded-full bg-ember-500"
          transition={{ duration: 0.3, ease: EASE }}
        />
      )}
    </motion.button>
  );
}
