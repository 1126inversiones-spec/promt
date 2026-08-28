"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Receipt, Sparkles } from "lucide-react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
const GOOGLE_FX_URL = "https://labs.google/fx/es-419/tools/flow/project/847c16e6-4fac-4e85-a6ca-2f69c44d47b8";

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

  async function handleGenerateVideo() {
    if (!prompt) return;
    // Copy prompt to clipboard
    await copyText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
    // Open Google Fx in new tab
    window.open(GOOGLE_FX_URL, "_blank");
  }

  return (
    <div className="sticky top-6">
      <div className="ticket-edge rounded-sm bg-cream px-6 pb-6 pt-7 text-[#26201a] shadow-card">
        <div className="mb-3 flex items-center justify-between border-b border-dashed border-[#26201a]/30 pb-2.5">
          <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.1em]">
            <Receipt size={13} /> Video order
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
                Pick an effect to start building your prompt. It'll fill in here as you go.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {prompt && (
          <div className="mt-4 space-y-3 border-t border-dashed border-[#26201a]/30 pt-3">
            <div className="flex flex-col gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerateVideo}
                className="btn-tactile btn-tactile-primary flex items-center justify-center gap-2 rounded-md px-3.5 py-2 font-sans text-xs font-semibold text-white"
              >
                <Sparkles size={14} />
                Generate Video with Google Fx
              </motion.button>
              <p className="text-[10px] leading-snug opacity-60 text-center">
                Opens Google Generative AI • Prompt already copied
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10.5px] leading-snug opacity-60">
                Ready to paste.
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className={`btn-tactile flex items-center gap-1.5 rounded-md px-3.5 py-2 font-sans text-xs font-semibold ${
                  copied ? "bg-emerald-600 text-white" : "btn-tactile-dark"
                }`}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied!" : "Copy prompt"}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
