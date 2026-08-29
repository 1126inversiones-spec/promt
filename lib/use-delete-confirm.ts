"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

export function useDeleteConfirm(onDelete?: () => void, timeoutMs = 3000) {
  const [confirming, setConfirming] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    if (!confirming) {
      setConfirming(true);
      timeoutRef.current = setTimeout(() => setConfirming(false), timeoutMs);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setConfirming(false);
    onDelete?.();
  }

  function reset() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setConfirming(false);
  }

  return { confirming, handleClick, reset };
}
