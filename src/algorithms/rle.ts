import { encodeMO, decodeMO } from "utils";
import type { MiddleOutConfig, CompressionResult } from "../../types";
import { getWeissmanScore } from "weissman";

/**
 * Compress a string using the Run-Length Encoding (RLE) algorithm.
 *
 * @param input - The raw string to compress.
 * @param config - Compressions configuration incuding:
 * - `preserveWhitespace`: Whether to retain whitespace in compression
 * - `algorithm`: Must be `rle` to match alogrithm type.
 * - `aggressionLevel`: Ignored in RLE (included for compatibility).
 * - `targetWeissman`: Used for mocking ideal compression.
 *
 * @returns A `ComprehensionResult` with metadata and compressed data formatted as: `MO::rle:<encoded>::WEISSMAN::<score>`
 */

export function compressWithRLE(
  input: string,
  config: Partial<MiddleOutConfig>
): CompressionResult {
  const preserveWhitespace = config?.preserveWhitespace ?? true;
  const cleanedInput = preserveWhitespace ? input : input.replace(/\s+/g, "");

  let compressed = "";
  let count = 1;

  for (let i = 0; i < cleanedInput.length; i++) {
    const current = cleanedInput[i];
    const next = cleanedInput[i + 1];

    if (current == next) {
      count++;
    } else {
      compressed += current + (count > 1 ? count : "");
      count = 1;
    }
  }

  const weissmanScore = getWeissmanScore(
    "rle",
    input.length,
    compressed.length,
    config.targetWeissman
  );

  return {
    original: input,
    compressed: compressed,
    originalSize: input.length,
    compressedSize: compressed.length,
    algorithm: "rle",
    weissmanScore: weissmanScore,
    encoded: encodeMO("rle", compressed, weissmanScore),
  };
}

/**
 * Decompresses a string compressed using the RLE algorithm.
 *
 * @param encoded - A string in the format:
 *   `MO::rle:<encoded_data>::WEISSMAN::<score>`
 * @returns The original, uncompressed string.
 *
 * @throws Will throw an error if the format is invalid or algorithm is not RLE.
 */
export function decompressWithRLE(encoded: string): string {
  const { algorithm, compressedData } = decodeMO(encoded);

  if (algorithm !== "rle") {
    throw new Error(
      `decompressWithRLE expected algorithm 'rle' but got '${algorithm}'`
    );
  }

  let result = "";
  for (let i = 0; i < compressedData.length; i++) {
    const char = compressedData[i];
    let numStr = "";

    while (/\d/.test(compressedData[i + 1])) {
      numStr += compressedData[++i];
    }

    const count = parseInt(numStr || "1", 10);
    result += char.repeat(count);
  }

  return result;
}
