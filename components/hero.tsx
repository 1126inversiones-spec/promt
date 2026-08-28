"use client";

import { useRef } from "react";
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

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const meshY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pt-28 pb-24 md:pt-36 md:pb-32">
      <motion.div
        style={{ y: meshY }}
        className="pointer-events-none absolute inset-0 bg-mesh-glow"
        aria-hidden
      />
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl"
      >
        <motion.div
          variants={item}
          className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-ember-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
          Herramienta interna · eMenu / Video IA
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight"
        >
          Arma el <span className="text-ember-500">prompt</span> perfecto
          <br />
          para tus videos de plato.
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-balance text-base leading-relaxed text-smoke md:text-lg">
          Elige el efecto según el tipo de plato, completa los detalles y copia el prompt listo
          para pegar en tu generador de video IA — Runway, Kling, Pika, Luma.
        </motion.p>
      </motion.div>
    </section>
  );
}
