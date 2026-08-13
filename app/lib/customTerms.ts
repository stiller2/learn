"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "tf-custom-terms";
const EVENT_NAME = "tf-custom-terms-changed";

export type CustomTerm = {
  id: string;
  term: string;
  definition: string;
};

const EMPTY: CustomTerm[] = [];

function readTerms(): CustomTerm[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

let cache: CustomTerm[] = readTerms();

function getSnapshot(): CustomTerm[] {
  return cache;
}

function getServerSnapshot(): CustomTerm[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  const handler = () => {
    cache = readTerms();
    callback();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(EVENT_NAME, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(EVENT_NAME, handler);
  };
}

function writeTerms(next: CustomTerm[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  cache = next;
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useCustomTerms() {
  const terms = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addTerm = useCallback((term: string, definition: string) => {
    const current = readTerms();
    const next = [
      ...current,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, term, definition },
    ];
    writeTerms(next);
  }, []);

  const removeTerm = useCallback((id: string) => {
    const current = readTerms();
    writeTerms(current.filter((t) => t.id !== id));
  }, []);

  return { terms, addTerm, removeTerm };
}
