"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, LogIn, LogOut } from "lucide-react";
import { subscribeToAuth, signInWithGoogle, signOutUser } from "@/lib/auth";
import { subscribeToMySkills, saveSkill, type SavedSkill } from "@/lib/skill-library";
import type { SkillDraft } from "@/lib/skills";
import { SkillTemplatesSection } from "@/components/skills/skill-templates-section";
import { SkillWizard } from "@/components/skills/skill-wizard";
import { MySkillsSection } from "@/components/skills/my-skills-section";
import { Footer } from "@/components/footer";
import type { User } from "firebase/auth";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function SkillBuilderApp() {
  const [user, setUser] = useState<User | null>(null);
  const [mySkills, setMySkills] = useState<SavedSkill[]>([]);
  const [mySkillsLoading, setMySkillsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user?.email) {
      setMySkills([]);
      setMySkillsLoading(false);
      return;
    }
    setMySkillsLoading(true);
    const unsubscribe = subscribeToMySkills(user.email, (skills) => {
      setMySkills(skills);
      setMySkillsLoading(false);
    });
    return unsubscribe;
  }, [user?.email]);

  function handleSaveToLibrary(draft: SkillDraft) {
    if (!user?.email) return Promise.reject(new Error("Not signed in"));
    return saveSkill(user.email, draft);
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-mesh-glow" aria-hidden />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative mx-auto max-w-4xl"
        >
          <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-xs text-smoke transition-colors hover:text-cream">
            <ArrowLeft size={13} />
            Back to Prompt Studio
          </Link>

          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-ember-400">
              <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
              Internal tool {"\u00b7"} eMenu / Claude Skills
            </div>
            {user ? (
              <button onClick={signOutUser} className="flex items-center gap-1.5 text-xs text-smoke transition-colors hover:text-cream">
                <LogOut size={13} />
                {user.email}
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-smoke transition-colors hover:border-ember-500/50 hover:text-ember-400"
              >
                <LogIn size={13} />
                Sign in
              </button>
            )}
          </div>

          <h1 className="max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
            Turn a repetitive task into a <span className="text-ember-500">skill</span>.
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-smoke md:text-lg">
            Answer a few guided questions and get a ready-to-use Claude Skill \u2014 for reports, client
            messages, audits, or anything your team does the same way every time.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-24">
        <SkillTemplatesSection />
        <SkillWizard user={user} onSaveToLibrary={handleSaveToLibrary} />
        <MySkillsSection user={user} skills={mySkills} loading={mySkillsLoading} onSignIn={signInWithGoogle} />
      </section>

      <Footer />
    </main>
  );
}
