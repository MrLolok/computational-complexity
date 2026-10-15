"use client";
import { useState, type ReactNode } from "react";
import { isTowerId } from "@/data/piani";
import { useHash } from "@/lib/hash";
export default function TowerDisclosure({ children }: { children: ReactNode }) {
  const linked = isTowerId(useHash());
  const [opened, setOpened] = useState<boolean | null>(null);
  const open = opened ?? linked;
  return <details open={open} className="rounded-xl border border-line p-4 sm:p-5"><summary className="cursor-pointer font-semibold" onClick={e => { e.preventDefault(); setOpened(!open); }}>Torre completa e ipotesi di collasso</summary><div className="mt-5">{children}</div></details>;
}
