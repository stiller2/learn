"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "tf-progress";
const EVENT_NAME = "tf-progress-changed";
const EMPTY: number[] = [];

function readCompleted(): number[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((value): value is number => typeof value === "number")
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

let cache: number[] = readCompleted();

function getSnapshot(): number[] {
  return cache;
}

function getServerSnapshot(): number[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  const handler = () => {
    cache = readCompleted();
    callback();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(EVENT_NAME, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(EVENT_NAME, handler);
  };
}

function writeCompleted(next: number[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  cache = next;
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((sessionNumber: number) => {
    const current = readCompleted();
    const next = current.includes(sessionNumber)
      ? current.filter((n) => n !== sessionNumber)
      : [...current, sessionNumber];
    writeCompleted(next);
  }, []);

  const isComplete = useCallback(
    (sessionNumber: number) => completed.includes(sessionNumber),
    [completed],
  );

  return { completed, count: completed.length, toggle, isComplete };
}
