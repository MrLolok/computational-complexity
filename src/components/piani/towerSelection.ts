"use client";

import { DEFAULT_TOWER, isTowerId, type TowerId } from "@/data/piani";
import { setHash, useHash } from "@/lib/hash";

/* Il nodo selezionato della torre vive nell'#hash (/piani#S2): così si può linkare da altre pagine. */

/** nodo selezionato: quello dell'#hash se valido, altrimenti S2 */
export function useTowerSel(): TowerId {
  const h = useHash();
  return isTowerId(h) ? h : DEFAULT_TOWER;
}

/** seleziona un nodo e aggiorna l'#hash senza aggiungere voci alla cronologia */
export const selectTower = (id: TowerId) => setHash(id);
