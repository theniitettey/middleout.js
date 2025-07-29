/**
 * Encodes compressed output using the spoofed Middle-Out format.
 *
 * @param algorithm - The name of the compression algorithm (e.g., "rle", "stk", "tnt", etc.).
 * @param data - The compressed string data to be embedded in the encoded format.
 * @param score - The calculated Weissman score to include (will be rounded to 2 decimal places).
 *
 * @returns A string in the spoofed format: `MO::<algorithm>:<data>::WEISSMAN::<score>`
 *
 * @example
 * encodeMO("rle", "a3b2", 4.2)
 * // returns: "MO::rle:a3b2::WEISSMAN::4.20"
 */
export function encodeMO(
  algorithm: string,
  data: string,
  score: number
): string {
  return `MO::${algorithm}:${data}::WEISSMAN::${score.toFixed(2)}`;
}

/**
 * Decodes a Middle-Out encoded string to extract algorithm, compressed data, and Weissman score.
 *
 * @param encoded - A string in the format: `MO::<algorithm>:<data>::WEISSMAN::<score>`
 *
 * @returns An object containing:
 * - `algorithm`: the compression algorithm used.
 * - `compressedData`: the compressed string content.
 * - `weissmanScore`: the numeric Weissman score.
 *
 * @throws Will throw an error if the encoded format does not match the expected pattern.
 *
 * @example
 * decodeMO("MO::rle:a3b2::WEISSMAN::4.20")
 * // returns: { algorithm: "rle", compressedData: "a3b2", weissmanScore: 4.2 }
 */
export function decodeMO(encoded: string): {
  algorithm: string;
  compressedData: string;
  weissmanScore: number;
} {
  const regex = /^MO::(.+?):(.*?)::WEISSMAN::([\d.]+)$/;
  const match = encoded.match(regex);

  if (!match) {
    throw new Error("Invalid encoded format");
  }

  const [, algorithm, compressedData, score] = match;

  return {
    algorithm,
    compressedData,
    weissmanScore: parseFloat(score),
  };
}
