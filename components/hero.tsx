"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const meshY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-24">
      <motion.div
        style={{ y: meshY }}
        className="pointer-events-none absolute inset-0 bg-mesh-glow"
        aria-hidden
      />
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-ember-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            Internal tool · eMenu / AI video
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-2xl font-display text-[clamp(2.2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight"
          >
            Build the perfect <span className="text-ember-500">prompt</span>
            <br />
            for your dish videos.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-balance text-base leading-relaxed text-smoke md:text-lg">
            Pick the effect for your dish, fill in the details, and copy a prompt that's ready
            to paste into your AI video generator — Runway, Kling, Pika, Luma.
          </motion.p>
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
