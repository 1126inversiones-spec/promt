"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, KeyRound, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
const GOOGLE_FX_URL =
  "https://labs.google/fx/es-419/tools/flow/project/847c16e6-4fac-4e85-a6ca-2f69c44d47b8";
const DEMO_EMAIL = "spinungiro180@gmail.com";

export function DemoAccess({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);

  if (entered) return <>{children}</>;

  return (
    <main className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-mesh-glow" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mx-auto w-full max-w-3xl"
      >
        <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-ember-400">
          <Sparkles size={14} />
          Private demo access
        </div>

        <div className="glass overflow-hidden rounded-2xl p-6 shadow-card sm:p-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Welcome to the <span className="text-ember-500">Prompt Studio</span> demo.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-smoke">
              This demo prepares cinematic prompts for your restaurant videos and sends you to
              the assigned Google Fx project when you are ready to generate.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <AccessStep number="01" icon={<KeyRound size={16} />} title="Sign in" text="Use the demo Google account provided by the owner." />
            <AccessStep number="02" icon={<ShieldCheck size={16} />} title="Stay secure" text="Enter credentials only on Google's sign-in page." />
            <AccessStep number="03" icon={<ArrowUpRight size={16} />} title="Open the project" text="Continue to the assigned Google Fx workspace." />
          </div>

          <div className="mt-8 rounded-xl border border-ember-500/25 bg-ember-500/10 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember-200">
              Demo account
            </p>
            <p className="mt-2 break-all font-mono text-sm text-cream">{DEMO_EMAIL}</p>
            <p className="mt-2 text-xs leading-relaxed text-smoke">
              The password is not displayed or stored in this app. For security, do not share
              account credentials publicly.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEntered(true)}
              className="btn-tactile btn-tactile-primary flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
            >
              <Check size={16} />
              Continue to Prompt Studio
            </motion.button>
            <a
              href={GOOGLE_FX_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-tactile btn-tactile-dark flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
            >
              Open Google Fx
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

function AccessStep({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border-t border-white/10 pt-3">
      <div className="flex items-center gap-2 font-mono text-xs text-ember-400">
        <span>{number}</span>
        {icon}
      </div>
      <h2 className="mt-3 font-display text-base font-semibold text-cream">{title}</h2>
      <p className="mt-1 text-xs leading-relaxed text-smoke">{text}</p>
    </div>
  );
}