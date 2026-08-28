"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export interface StepperStep {
  id: string;
  label: string;
  completed: boolean;
}

interface WizardStepperProps {
  steps: StepperStep[];
  currentStepIndex: number;
  children: ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  canNext?: boolean;
  canPrev?: boolean;
  hideNavigation?: boolean;
}

export function WizardStepper({
  steps,
  currentStepIndex,
  children,
  onNext,
  onPrev,
  canNext = true,
  canPrev = true,
  hideNavigation = false,
}: WizardStepperProps) {
  const currentStep = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;
  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Glass Background Container */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface-900/80 via-base/60 to-surface-900/80 p-6 backdrop-blur-xl sm:p-8"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-gradient-to-r from-ember-500/20 via-purple-500/20 to-blue-500/20"
            style={{
              animation: "gradient-shift 8s ease-in-out infinite",
            }}
          />
        </div>

        {/* Desktop: Horizontal Stepper */}
        <div className="relative hidden sm:block mb-8">
          <div className="flex items-center gap-4">
            <svg
              className="absolute top-8 left-0 w-full h-2 -z-10"
              style={{ height: "2px" }}
            >
              {steps.map((_, idx) => {
                if (idx === steps.length - 1) return null;
                const startX = (idx / (steps.length - 1)) * 100;
                const endX = ((idx + 1) / (steps.length - 1)) * 100;
                const arcProgress = Math.max(
                  0,
                  Math.min(1, (progress - startX) / (endX - startX))
                );

                return (
                  <motion.path
                    key={idx}
                    d={`M ${startX}% 50 Q ${(startX + endX) / 2}% 0, ${endX}% 50`}
                    stroke="url(#arcGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="100"
                    strokeDashoffset={`${100 * (1 - arcProgress)}`}
                    initial={{ strokeDashoffset: 100 }}
                    animate={{
                      strokeDashoffset: 100 * (1 - arcProgress),
                    }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                );
              })}
              <defs>
                <linearGradient
                  id="arcGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                  <stop offset="50%" stopColor="rgb(139, 92, 246)" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" />
                </linearGradient>
              </defs>
            </svg>

            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4, ease: EASE }}
              >
                {/* Step Dot */}
                <motion.div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 font-bold transition-all ${
                    idx < currentStepIndex
                      ? "border-ember-400 bg-ember-500/30 text-ember-300"
                      : idx === currentStepIndex
                      ? "border-ember-500 bg-ember-500/40 text-ember-100"
                      : "border-surface-600 bg-surface-800/50 text-smoke"
                  }`}
                  animate={
                    idx === currentStepIndex
                      ? {
                          boxShadow: [
                            "0 0 0px rgba(59, 130, 246, 0)",
                            "0 0 30px rgba(59, 130, 246, 0.8)",
                            "0 0 0px rgba(59, 130, 246, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    idx === currentStepIndex
                      ? { duration: 2, repeat: Infinity }
                      : {}
                  }
                  whileHover={idx !== currentStepIndex ? { scale: 1.05 } : {}}
                >
                  {/* Checkmark for completed steps */}
                  <AnimatePresence mode="wait">
                    {idx < currentStepIndex ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 10,
                        }}
                      >
                        <Check size={24} strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 10,
                        }}
                      >
                        {idx + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Pulse ring for current step */}
                  {idx === currentStepIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-ember-400"
                      animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.div>

                {/* Step Label */}
                <motion.p
                  className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-cream text-center max-w-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.2, duration: 0.4 }}
                >
                  {step.label}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Progress Text */}
          <motion.p
            className="mt-6 text-center text-xs font-mono text-smoke/70"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Step {currentStepIndex + 1} of {steps.length}
          </motion.p>
        </div>

        {/* Mobile: Simplified Stepper */}
        <div className="relative sm:hidden mb-6">
          {/* Mobile Progress Bar */}
          <div className="mb-4 h-1 w-full rounded-full bg-surface-700/50 overflow-hidden border border-surface-600/50">
            <motion.div
              className="h-full bg-gradient-to-r from-ember-500 via-purple-500 to-ember-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>

          {/* Mobile Step Text */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-smoke/70 font-mono">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
              <p className="text-sm font-semibold text-cream mt-1">
                {currentStep.label}
              </p>
            </div>

            {/* Mobile Step Indicators */}
            <div className="flex gap-2">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  className={`h-2 rounded-full transition-all ${
                    idx <= currentStepIndex
                      ? "bg-gradient-to-r from-ember-500 to-purple-500 w-3"
                      : "bg-surface-600 w-2"
                  }`}
                  animate={
                    idx === currentStepIndex
                      ? { scale: [1, 1.2, 1] }
                      : {}
                  }
                  transition={
                    idx === currentStepIndex
                      ? { duration: 2, repeat: Infinity }
                      : {}
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[300px] sm:min-h-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ perspective: 1000 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      {!hideNavigation && (
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: canPrev && !isFirst ? 1.03 : 1 }}
            whileTap={{ scale: canPrev && !isFirst ? 0.95 : 1 }}
            onClick={onPrev}
            disabled={!canPrev || isFirst}
            className={`btn-tactile btn-tactile-dark flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              !canPrev || isFirst
                ? "opacity-40 cursor-not-allowed"
                : "hover:from-surface-700 hover:to-surface-600"
            }`}
          >
            <ChevronLeft size={16} strokeWidth={2} />
            <span className="hidden sm:inline">Back</span>
          </motion.button>

          <div className="flex-1" />

          <motion.button
            whileHover={{ scale: canNext && !isLast ? 1.03 : 1 }}
            whileTap={{ scale: canNext && !isLast ? 0.95 : 1 }}
            onClick={onNext}
            disabled={!canNext || isLast}
            className={`btn-tactile btn-tactile-primary flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              !canNext || isLast
                ? "opacity-40 cursor-not-allowed"
                : "hover:from-ember-600 hover:to-ember-500"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} strokeWidth={2} />
          </motion.button>
        </motion.div>
      )}

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
