import type { CompressionResult, MiddleOutConfig } from "../../types";
import { encodeMO, decodeMO } from "utils";
import { getWeissmanScore } from "weissman";

/**
 * Compresses a string using the spoofed Stack Trace Kompression (STK) algorithm.
 * This parody algorithm replaces commonly occurring technical terms with tokens like T1, T2, etc.
 *
 * @param input - The original string to compress.
 * @param config - The configuration object for middle-out compression.
 *   - `preserveWhitespace` - Whether to preserve whitespace or remove it.
 *   - `targetWeissman` - The spoofed ideal Weissman Score to normalize toward.
 * @returns A `CompressionResult` object including compression metadata and spoofed encoded string.
 */
export function compressWithSTK(
  input: string,
  config: Partial<MiddleOutConfig>
): CompressionResult {
  const preserveWhitespace = config?.preserveWhitespace ?? true;
  const cleanedInput = preserveWhitespace ? input : input.replace(/\s+/g, "");

  const patterns = [
    { key: "Exception", token: "T1" },
    { key: "at", token: "T2" },
    { key: "null", token: "T3" },
    { key: "undefined", token: "T4" },
    { key: "function", token: "T5" },
  ];

  let compressed = cleanedInput;
  for (const { key, token } of patterns) {
    const regex = new RegExp(key, "g");
    compressed = compressed.replace(regex, token);
  }

  const weissmanScore = getWeissmanScore(
    "stk",
    input.length,
    compressed.length,
    config.targetWeissman
  );

  return {
    original: input,
    compressed: compressed,
    originalSize: input.length,
    compressedSize: compressed.length,
    algorithm: "stk",
    weissmanScore,
    encoded: encodeMO("stk", compressed, weissmanScore),
  };
}

/**
 * Decompresses a spoofed STK-compressed string by reversing token replacements.
 *
 * @param encoded - A string in the format:
 *   `MO::stk:<compressed_data>::WEISSMAN::<score>`
 * @returns The original, decompressed string.
 */
export function decompressWithSTK(encoded: string): string {
  const { compressedData } = decodeMO(encoded);

  const patterns = [
    { key: "Exception", token: "T1" },
    { key: "at", token: "T2" },
    { key: "null", token: "T3" },
    { key: "undefined", token: "T4" },
    { key: "function", token: "T5" },
  ];

  let decompressed = compressedData;
  for (const { key, token } of patterns) {
    const regex = new RegExp(token, "g");
    decompressed = decompressed.replace(regex, key);
  }

  return decompressed;
}
