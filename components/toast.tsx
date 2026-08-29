"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertOctagon, X } from "lucide-react";

export function Toast({ message, onClose }: { message: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -12, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -8, x: "-50%" }}
          transition={{ duration: 0.25 }}
          className="fixed left-1/2 top-5 z-50 flex max-w-sm items-start gap-2.5 rounded-xl border border-red-500/30 bg-[#1a1113] px-4 py-3 shadow-2xl"
        >
          <AlertOctagon size={16} className="mt-0.5 shrink-0 text-red-400" />
          <p className="text-sm leading-relaxed text-cream">{message}</p>
          <button
            onClick={onClose}
            className="ml-1 shrink-0 text-smoke transition-colors hover:text-cream"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
