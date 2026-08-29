"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDeleteConfirm } from "@/lib/use-delete-confirm";
import { Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function CategoryCard({
  icon: Icon,
  title,
  desc,
  meta,
  active,
  onSelect,
  previewSrc,
  badge,
  onDelete,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  meta?: string;
  active: boolean;
  onSelect: () => void;
  previewSrc?: string;
  badge?: string;
  onDelete?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovering, setHovering] = useState(false);
  const { confirming, handleClick: handleDeleteClick, reset: resetDeleteConfirm } = useDeleteConfirm(onDelete);

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
    setHovering(false);
    resetDeleteConfirm();
  }

  return (
    <motion.button
      ref={ref}
      onClick={onSelect}
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn(
        "depth-card group relative flex flex-col gap-3 overflow-hidden rounded-2xl p-4 text-left transition-colors",
        active ? "depth-card-active" : "hover:border-white/15"
      )}
    >
      <div className="depth-sheen" aria-hidden="true" />

      {previewSrc && (
        <AnimatePresence>
          {hovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-[1]"
            >
              <video
                src={previewSrc}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
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
        <div className="flex items-center gap-1.5">
          <div className="font-display text-sm font-semibold text-cream">{title}</div>
          {badge && (
            <span className="rounded-full bg-ember-500/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-ember-400">
              {badge}
            </span>
          )}
        </div>
        <div className="mt-1 text-xs leading-relaxed text-smoke">{desc}</div>
        {meta && <div className="mt-1.5 font-mono text-[10px] text-smoke/60">{meta}</div>}
      </div>
      {onDelete && (
        <button
          onClick={handleDeleteClick}
          aria-label={confirming ? "Confirm delete" : "Delete custom prompt"}
          className={cn(
            "absolute right-2.5 top-2.5 z-10 flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px] font-semibold transition-all",
            confirming
              ? "bg-red-500 text-white opacity-100"
              : "text-smoke opacity-0 hover:text-red-400 group-hover:opacity-100"
          )}
        >
          <Trash2 size={13} />
          {confirming && "Confirm?"}
        </button>
      )}
      {active && (
        <motion.div
          layoutId="active-pill"
          className="absolute left-3 top-3 z-10 h-2 w-2 rounded-full bg-ember-500"
          transition={{ duration: 0.3, ease: EASE }}
        />
      )}
    </motion.button>
  );
}
