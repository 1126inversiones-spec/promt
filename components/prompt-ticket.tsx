"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Receipt } from "lucide-react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

export function PromptTicket({ prompt, orderNumber }: { prompt: string | null; orderNumber: number }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!prompt) return;
    await copyText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="sticky top-6">
      <div className="ticket-edge rounded-sm bg-cream px-6 pb-6 pt-7 text-[#26201a] shadow-card">
        <div className="mb-3 flex items-center justify-between border-b border-dashed border-[#26201a]/30 pb-2.5">
          <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.1em]">
            <Receipt size={13} /> Orden de video
          </span>
          <span className="font-mono text-[11px] opacity-60">
            #{String(orderNumber).padStart(2, "0")}
          </span>
        </div>

        <div className="min-h-[140px]">
          <AnimatePresence mode="wait">
            {prompt ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed"
              >
                {prompt}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-2 text-[13px] leading-relaxed opacity-55"
              >
                Elige un efecto para empezar a armar el prompt. Se irá completando aquí a medida
                que llenas los campos.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {prompt && (
          <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#26201a]/30 pt-3">
            <span className="text-[10.5px] leading-snug opacity-60">
              Prompt en inglés — listo para IA de video.
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 font-sans text-xs font-semibold transition-colors ${
                copied ? "bg-emerald-600 text-white" : "bg-[#26201a] text-cream hover:bg-[#332a22]"
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "¡Copiado!" : "Copiar prompt"}
            </motion.button>
          </div>
        )}
      </div>
      <p className="mt-3.5 text-center text-[11px] leading-relaxed text-smoke">
        El prompt se genera en inglés porque así responden mejor la mayoría de modelos de video IA.
      </p>
    </div>
  );
}
