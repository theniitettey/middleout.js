/**
 * Calculates a spoofed Weissman Score for a given compression.
 *
 * @param algorithm - The name of the algorithm used.
 * @param originalSize - Size of the input string before compression.
 * @param compressedSize - Size after compression.
 * @param targetWeissman - The desired spoofed "ideal" score (optional).
 * @returns A fake Weissman score that rewards better compression and tunes toward a target.
 */
export function getWeissmanScore(
  algorithm: string,
  originalSize: number,
  compressedSize: number,
  targetWeissman: number = 5.0
): number {
  if (compressedSize === 0) return targetWeissman + 1; // lol perfect compression

  const ratio = originalSize / compressedSize;
  const normalized = Math.log2(ratio + 1); // to make it non-negative and smoother

  const algoWeight = algorithm.length % 4; // totally fake influence
  const spoofedScore = normalized + algoWeight;

  return (spoofedScore + targetWeissman) / 2;
}
