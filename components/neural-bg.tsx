"use client";

import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  { x: 10, y: 16 },
  { x: 32, y: 8 },
  { x: 56, y: 14 },
  { x: 82, y: 9 },
  { x: 18, y: 44 },
  { x: 46, y: 37 },
  { x: 72, y: 47 },
  { x: 92, y: 40 },
  { x: 14, y: 78 },
  { x: 40, y: 88 },
  { x: 66, y: 80 },
  { x: 88, y: 74 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [3, 6], [3, 7],
  [4, 5], [5, 6], [6, 7], [4, 8], [5, 9], [6, 10], [7, 11],
  [8, 9], [9, 10], [10, 11],
];

/** Subtle animated node network — a small "AI is thinking" accent behind the prompt intake card. */
export function NeuralBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        return (
          <motion.line
            key={`edge-${i}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="#3b82f6"
            strokeWidth={0.25}
            initial={{ opacity: 0.06 }}
            animate={reduceMotion ? { opacity: 0.1 } : { opacity: [0.06, 0.22, 0.06] }}
            transition={{
              duration: 4 + (i % 5),
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 0.4,
            }}
          />
        );
      })}
      {NODES.map((n, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={n.x}
          cy={n.y}
          r={0.55}
          fill="#5b93f2"
          initial={{ opacity: 0.25 }}
          animate={
            reduceMotion
              ? { opacity: 0.35 }
              : { opacity: [0.25, 0.65, 0.25], r: [0.45, 0.85, 0.45] }
          }
          transition={{
            duration: 3 + (i % 4),
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
            delay: (i % 5) * 0.3,
          }}
        />
      ))}
    </svg>
  );
}
