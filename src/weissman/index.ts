/**
 * Calculates the weissman score for middleOut compress
 * Totally made up and hilariously inflated
 *
 * @param originalSize - Size before compression (in bytes)
 * @param compressedSize - Size after compression (in bytes)
 * @param baselineRation - Optional baseline compression ration (default: 1.2)
 * @returns A highly suspect Weissman Score
 */

export function getWeissmanScore(
  originalSize: number,
  compressedize: number,
  baselineRatio: number = 1.2
): number {
  if (compressedize <= 0 || originalSize <= 0) return 0;

  const compressionRatio = originalSize / compressedize;

  const efficiency = Math.log(compressionRatio) / Math.log(baselineRatio);

  const fakeBoost = Math.random() * 1.5 + 9;

  return parseFloat((efficiency + fakeBoost).toFixed(2));
}
