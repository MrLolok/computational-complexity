"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { hydrate, initialProgress, type ProgressState } from "./progressSlice";

/** Le risposte restano nel browser di chi studia: localStorage, chiave versionata. */
export const STORAGE_KEY = "cc-progress:v1";

function load(): ProgressState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialProgress, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

/*
 * Un solo store per pagina, creato fuori dal render: Redux usa Math.random() all'avvio,
 * che con cacheComponents non può comparire durante il prerender. Sul server lo store
 * resta sempre allo stato iniziale (si riempie solo nel browser, da localStorage).
 */
const store = makeStore();
/*
 * Lo stato vuoto con cui il server ha reso la pagina. Durante l'idratazione react-redux usa questo
 * (serverState) e non lo stato già caricato da localStorage: le parti della pagina che si idratano
 * dopo l'avvio combaciano con l'HTML del server e poi si aggiornano.
 */
const serverState = store.getState();

export default function StoreProvider({ children }: { children: ReactNode }) {

  useEffect(() => {
    const saved = load();
    if (saved) store.dispatch(hydrate(saved));
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = store.subscribe(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().progress));
        } catch {
          /* archivio non disponibile: il progresso vale solo per questa visita */
        }
      }, 250);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return <Provider store={store} serverState={serverState}>{children}</Provider>;
}
