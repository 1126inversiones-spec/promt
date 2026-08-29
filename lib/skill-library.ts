"use client";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { SkillDraft } from "./skills";

export interface SavedSkill extends SkillDraft {
  id: string;
  ownerEmail: string;
  createdAt: number;
}

const COLLECTION = "skills";

interface SavedSkillDoc extends SkillDraft {
  ownerEmail: string;
  createdAt: Timestamp | null;
}

/** Subscribes to the signed-in user's own skills only. Returns an unsubscribe function. */
export function subscribeToMySkills(email: string, callback: (skills: SavedSkill[]) => void): () => void {
  const q = query(collection(db, COLLECTION), where("ownerEmail", "==", email));
  return onSnapshot(
    q,
    (snapshot) => {
      const skills: SavedSkill[] = snapshot.docs.map((d) => {
        const data = d.data() as SavedSkillDoc;
        return {
          ...data,
          id: d.id,
          createdAt: data.createdAt?.toMillis() ?? Date.now(),
        };
      });
      skills.sort((a, b) => b.createdAt - a.createdAt);
      callback(skills);
    },
    (error) => {
      console.error("Failed to load your skill library:", error);
      callback([]);
    }
  );
}

export async function saveSkill(email: string, draft: SkillDraft): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    ...draft,
    ownerEmail: email,
    createdAt: serverTimestamp(),
  });
}

export async function deleteSkill(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
