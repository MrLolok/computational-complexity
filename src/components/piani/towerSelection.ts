"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_TOWER, isTowerId, type TowerId } from "@/data/piani";

/* Il nodo selezionato della torre vive nell'#hash (/piani#S2): così si può linkare da altre pagine. */
const EVT = "piani:tower";

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  window.addEventListener("popstate", cb);
  window.addEventListener(EVT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVT, cb);
  };
}
const getSnapshot = () => decodeURIComponent(window.location.hash.replace(/^#/, ""));
const getServerSnapshot = () => "";

/** nodo selezionato: quello dell'#hash se valido, altrimenti S2 */
export function useTowerSel(): TowerId {
  const h = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return isTowerId(h) ? h : DEFAULT_TOWER;
}

/** seleziona un nodo e aggiorna l'#hash senza aggiungere voci alla cronologia */
export function selectTower(id: TowerId) {
  try {
    history.replaceState(history.state, "", "#" + id);
  } catch {
    /* niente */
  }
  window.dispatchEvent(new Event(EVT));
}
