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
}

const COLLECTION = "customEffects";

interface CustomEffectDoc {
  groupId: GroupId;
  title: string;
  prompt: string;
  createdAt: Timestamp | null;
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

export async function addCustomEffect(groupId: GroupId, title: string, prompt: string): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    groupId,
    title: title.trim() || "Untitled prompt",
    prompt,
    createdAt: serverTimestamp(),
  });
}

export async function removeCustomEffect(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
