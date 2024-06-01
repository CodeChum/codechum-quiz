export const isArraysEqual = (a: string[], b: string[]) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  const aCopy = [...a].sort();
  const bCopy = [...b].sort();

  for (let i = 0; i < a.length; ++i) {
    if (aCopy[i] !== bCopy[i]) return false;
  }
  return true;
};
