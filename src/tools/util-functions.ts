export const concatClasses: (...args: (string | undefined)[]) => string =
    (...args: (string | undefined)[]) => args.join(" ").trim();

export const isPresent = (item: unknown): boolean => {
    return item !== undefined && item !== null;
}

export const isBlank = (item: unknown): boolean => {
    return !isPresent(item);
}

export const anyBlank = (...items: unknown[]): boolean => {
    return items.some(isBlank);
}

export const allBlank = (...items: unknown[]): boolean => {
    return items.every(isBlank);
}

export const anyPresent = (...items: unknown[]): boolean => {
    return items.some(isPresent);
}

export const allPresent = (...items: unknown[]): boolean => {
    return items.every(isPresent);
}