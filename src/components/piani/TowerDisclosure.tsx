"use client";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { isTowerId } from "@/data/piani";
const subscribe = (cb: () => void) => { window.addEventListener("hashchange", cb); window.addEventListener("popstate", cb); return () => { window.removeEventListener("hashchange", cb); window.removeEventListener("popstate", cb); }; };
const snapshot = () => isTowerId(window.location.hash.slice(1));
export default function TowerDisclosure({ children }: { children: ReactNode }) {
  const linked = useSyncExternalStore(subscribe, snapshot, () => false);
  const [opened, setOpened] = useState<boolean | null>(null);
  const open = opened ?? linked;
  return <details open={open} className="rounded-xl border border-line p-4 sm:p-5"><summary className="cursor-pointer font-semibold" onClick={e => { e.preventDefault(); setOpened(!open); }}>Torre completa e ipotesi di collasso</summary><div className="mt-5">{children}</div></details>;
}
