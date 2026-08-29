"use client";

import { cn } from "@/lib/utils";
import { useDeleteConfirm } from "@/lib/use-delete-confirm";
import { Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function CategoryListRow({
  icon: Icon,
  title,
  desc,
  active,
  onSelect,
  badge,
  onDelete,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  active: boolean;
  onSelect: () => void;
  badge?: string;
  onDelete?: () => void;
}) {
  const { confirming, handleClick: handleDeleteClick } = useDeleteConfirm(onDelete);

  return (
    <button
      onClick={onSelect}
      className={cn(
        "depth-card group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
        active ? "border-ember-500/60 shadow-glow" : "hover:border-white/15"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
          active
            ? "border-ember-500/50 bg-ember-500/10 text-ember-400"
            : "border-white/10 bg-white/5 text-smoke group-hover:text-ember-400"
        )}
      >
        <Icon size={15} strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-display text-[13px] font-semibold text-cream">{title}</span>
          {badge && (
            <span className="shrink-0 rounded-full bg-ember-500/15 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-wide text-ember-400">
              {badge}
            </span>
          )}
        </div>
        <div className="truncate text-[11px] text-smoke">{desc}</div>
      </div>
      {active && <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />}
      {onDelete && (
        <button
          onClick={handleDeleteClick}
          aria-label={confirming ? "Confirm delete" : "Delete custom prompt"}
          className={cn(
            "shrink-0 flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px] font-semibold transition-all",
            confirming
              ? "bg-red-500 text-white opacity-100"
              : "text-smoke opacity-0 hover:text-red-400 group-hover:opacity-100"
          )}
        >
          <Trash2 size={12} />
          {confirming && "Confirm?"}
        </button>
      )}
    </button>
  );
}
