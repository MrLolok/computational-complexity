# Corollario: EXACT COVER BY 3-SETS, SET COVERING e SET PACKING sono NP-completi

## Prima di leggere

Se ogni istanza di un problema A è anche un'istanza di un problema B con la stessa risposta, e A è NP-completo, che cosa si può dire di B? E se fosse B a essere NP-completo, che cosa si direbbe di A?

<details><summary>Risposta</summary>

B è NP-difficile: la riduzione da A a B lascia l'istanza com'è. Nel verso opposto non si dice niente: 2-SAT è un caso particolare di SAT, ed è in P.

</details>

## I tre problemi

Sono dati un insieme finito $U$, l'universo, e una famiglia $F$ di sottoinsiemi di $U$.

- EXACT COVER BY 3-SETS: $|U| = 3m$ e ogni insieme di $F$ ha 3 elementi; esistono $m$ insiemi di $F$ disgiunti che coprono $U$?
- SET COVERING: dato un budget, esistono insiemi di $F$, in numero non superiore al budget, la cui unione è $U$?
- SET PACKING: dato un obiettivo $K$, esistono $K$ insiemi di $F$ disgiunti a due a due?

Tutti e tre stanno in NP. Il certificato è l'elenco degli insiemi scelti, e secondo il problema si controlla in tempo polinomiale che siano disgiunti, che la loro unione sia $U$ e che il loro numero rispetti il budget o l'obiettivo.

## Una catena di casi particolari

TRIPARTITE MATCHING è un caso particolare di EXACT COVER BY 3-SETS. Data l'istanza $(B, G, H, T)$ si pone $U = B \cup G \cup H$ con tutti gli elementi distinti, quindi $|U| = 3n$ e $m = n$. La famiglia $F$ contiene le terne di $T$, ognuna vista come insieme $\{b, g, h\}$. Un matching è fatto di $n$ terne senza componenti in comune, cioè di $n$ insiemi disgiunti di 3 elementi, che coprono $3n$ elementi, quindi tutto $U$. Viceversa, una copertura esatta è fatta di $n$ terne disgiunte.

EXACT COVER BY 3-SETS è a sua volta un caso particolare degli altri due, con la stessa famiglia. In entrambi i casi basta un conteggio: $m$ insiemi di 3 elementi coprono $3m$ elementi solo se non si sovrappongono.

- SET COVERING con budget $m$. Una copertura esatta usa $m$ insiemi. Viceversa, se al più $m$ insiemi di 3 elementi coprono i $3m$ elementi di $U$, sono esattamente $m$ e disgiunti: se fossero meno, o se due si sovrapponessero, la loro unione avrebbe meno di $3m$ elementi.
- SET PACKING con obiettivo $K = m$. Una copertura esatta dà $m$ insiemi disgiunti. Viceversa, $m$ insiemi disgiunti di 3 elementi contengono in tutto $3m$ elementi, quindi coprono $U$.

Le trasformazioni riscrivono l'istanza senza calcoli e si fanno in spazio logaritmico. Siccome TRIPARTITE MATCHING è NP-completo, lo sono tutti e tre i problemi.

## Un esempio

Siano $B = \{b_1, b_2\}$, $G = \{g_1, g_2\}$, $H = \{h_1, h_2\}$ e $T = \{(b_1, g_1, h_1), (b_1, g_2, h_2), (b_2, g_2, h_2)\}$. L'universo ha 6 elementi e $m = 2$. Con budget 2, SET COVERING accetta solo la coppia $\{b_1, g_1, h_1\}$, $\{b_2, g_2, h_2\}$, che è anche il matching. Le altre due coppie di insiemi si sovrappongono e coprono 5 e 4 elementi.

## Dove si inciampa di solito

Il verso conta: sapere che SET COVERING è difficile non direbbe niente su EXACT COVER BY 3-SETS, che ne è un caso particolare.

Gli elementi di $B$, $G$ e $H$ vanno tenuti distinti nell'universo. Se un ragazzo e una casa fossero lo stesso elemento, $|U|$ sarebbe minore di $3n$ e il conteggio non tornerebbe.
