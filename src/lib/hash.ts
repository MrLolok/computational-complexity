import { useSyncExternalStore } from "react";

/* L'#hash dell'indirizzo come stato condiviso tra i componenti: cambia con i link, con avanti/indietro e con setHash. */
const EVT = "app:hash";

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
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

/** #hash attuale senza il #; "" sul server */
export const useHash = () => useSyncExternalStore(subscribe, getHash, getServerHash);

/** cambia l'#hash ("" lo toglie) senza aggiungere voci alla cronologia */
export function setHash(hash: string) {
  try {
    history.replaceState(history.state, "", hash ? `#${hash}` : location.pathname + location.search);
  } catch {
    /* niente */
  }
  window.dispatchEvent(new Event(EVT));
}
