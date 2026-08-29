"use client";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { GroupId } from "./categories";

export interface CustomEffect {
  id: string;
  groupId: GroupId;
  title: string;
  prompt: string;
  createdAt: number;
  createdBy: string | null;
}

const COLLECTION = "customEffects";

interface CustomEffectDoc {
  groupId: GroupId;
  title: string;
  prompt: string;
  createdAt: Timestamp | null;
  createdBy?: string | null;
}

/** Subscribes to the shared library in real time. Returns an unsubscribe function. */
export function subscribeToCustomEffects(callback: (effects: CustomEffect[]) => void): () => void {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const effects: CustomEffect[] = snapshot.docs.map((d) => {
        const data = d.data() as CustomEffectDoc;
        return {
          id: d.id,
          groupId: data.groupId,
          title: data.title,
          prompt: data.prompt,
          createdAt: data.createdAt?.toMillis() ?? Date.now(),
          createdBy: data.createdBy ?? null,
        };
      });
      callback(effects);
    },
    (error) => {
      console.error("Failed to load the shared prompt library:", error);
      callback([]);
    }
  );
}

export async function addCustomEffect(
  groupId: GroupId,
  title: string,
  prompt: string,
  createdBy: string | null
): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    groupId,
    title: title.trim() || "Untitled prompt",
    prompt,
    createdAt: serverTimestamp(),
    createdBy,
  });
}

export async function removeCustomEffect(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

/** Default suggested title for a new prompt in a group, e.g. "Drinks prompt". */
export function suggestedTitleFor(groupTitle: string): string {
  return `${groupTitle} prompt`;
}

/**
 * Returns a title guaranteed not to collide with existingTitles. If the base title is
 * already taken, appends " V2", " V3", etc., picking the next free number.
 */
export function suggestUniqueTitle(baseTitle: string, existingTitles: string[]): string {
  const trimmed = baseTitle.trim() || "Untitled prompt";
  if (!existingTitles.includes(trimmed)) return trimmed;
  let n = 2;
  while (existingTitles.includes(`${trimmed} V${n}`)) {
    n += 1;
  }
  return `${trimmed} V${n}`;
}
