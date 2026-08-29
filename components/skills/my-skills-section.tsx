"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check, Download, Trash2, LogIn } from "lucide-react";
import { buildSkillMarkdown, slugify } from "@/lib/skills";
import { deleteSkill, type SavedSkill } from "@/lib/skill-library";
import { useDeleteConfirm } from "@/lib/use-delete-confirm";
import type { User } from "firebase/auth";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function MySkillsSection({
  user,
  skills,
  loading,
  onSignIn,
}: {
  user: User | null;
  skills: SavedSkill[];
  loading: boolean;
  onSignIn: () => void;
}) {
  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-smoke">My skill library</div>
      <p className="mb-5 text-sm text-smoke">Private to your account \u2014 only you can see or manage these.</p>

      {!user ? (
        <button
          onClick={onSignIn}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-smoke transition-colors hover:border-ember-500/50 hover:text-ember-400"
        >
          <LogIn size={14} />
          Sign in with Google to see your library
        </button>
      ) : loading ? (
        <div className="flex flex-col gap-2.5">
          <div className="skeleton animate-shimmer h-[62px] rounded-xl" />
          <div className="skeleton animate-shimmer h-[62px] rounded-xl" />
        </div>
      ) : skills.length === 0 ? (
        <p className="text-sm text-smoke">You haven't saved any skills yet \u2014 build one above.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {skills.map((s) => (
              <SkillRow key={s.id} skill={s} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function SkillRow({ skill }: { skill: SavedSkill }) {
  const [copied, setCopied] = useState(false);
  const { confirming, handleClick: handleDeleteClick } = useDeleteConfirm(() => {
    deleteSkill(skill.id).catch((err) => console.error("Failed to delete skill:", err));
  });

  const markdown = buildSkillMarkdown(skill);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(skill.name)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="depth-card flex items-center justify-between gap-3 rounded-xl px-4 py-3"
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-cream">{skill.name || "Untitled skill"}</div>
        <div className="mt-0.5 truncate text-xs text-smoke">{skill.trigger}</div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button onClick={handleCopy} className="rounded-md border border-white/10 p-1.5 text-smoke transition-colors hover:border-ember-500/50 hover:text-ember-400">
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
        <button onClick={handleDownload} className="rounded-md border border-white/10 p-1.5 text-smoke transition-colors hover:border-ember-500/50 hover:text-ember-400">
          <Download size={13} />
        </button>
        <button
          onClick={handleDeleteClick}
          className={
            confirming
              ? "flex items-center gap-1 rounded-md bg-red-500 px-2 py-1.5 text-[10px] font-semibold text-white"
              : "rounded-md border border-white/10 p-1.5 text-smoke transition-colors hover:border-red-500/50 hover:text-red-400"
          }
        >
          <Trash2 size={13} />
          {confirming && "Confirm?"}
        </button>
      </div>
    </motion.div>
  );
}
