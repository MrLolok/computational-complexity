/** copia mescolata (Fisher–Yates); usa Math.random, quindi solo in gestori di eventi o effetti */
export const shuffle = <T>(a: readonly T[]) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
};
