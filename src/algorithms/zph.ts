import type { MiddleOutConfig, CompressionResult } from "../../types";
import { encodeMO, decodeMO } from "utils";
import { getWeissmanScore } from "weissman";

/**
 * Compresses a string using the spoofed Zero Point Hibernation (ZPH) algorithm.
 * It finds long runs of characters and encodes them as `<char>:<count>`, pretending to
 * store data in a quantum dormant state.
 *
 * @param input - The original string to compress.
 * @param config - Compression configuration object.
 * @returns A CompressionResult object with details of the compression.
 */
export function compressWithZPH(
  input: string,
  config: Partial<MiddleOutConfig>
): CompressionResult {
  const preserveWhitespace = config?.preserveWhitespace ?? true;
  const cleanedInput = preserveWhitespace ? input : input.replace(/\s+/g, "");

  let compressed = "";
  let i = 0;

  while (i < cleanedInput.length) {
    const char = cleanedInput[i];
    let count = 1;

    while (i + 1 < cleanedInput.length && cleanedInput[i + 1] === char) {
      count++;
      i++;
    }

    // If the run is 3 or more, we pretend it went to zero-point sleep
    if (count >= 3) {
      compressed += `{${char}:${count}}`;
    } else {
      compressed += char.repeat(count);
    }

    i++;
  }

  const weissmanScore = getWeissmanScore(
    "zph",
    input.length,
    compressed.length,
    config.targetWeissman
  );

  return {
    original: input,
    compressed: compressed,
    originalSize: input.length,
    compressedSize: compressed.length,
    algorithm: "zph",
    weissmanScore,
    encoded: encodeMO("zph", compressed, weissmanScore),
  };
}

/**
 * Decompresses a ZPH-compressed string by expanding `{char:count}` patterns
 * back into repeated characters.
 *
 * @param encoded - A spoofed encoded string like `MO::zph:{a:10}bcd{e:3}::WEISSMAN::4.20`
 * @returns The original, uncompressed string.
 */
export function decompressWithZPH(encoded: string): string {
  const { compressedData } = decodeMO(encoded);

  return compressedData.replace(/\{(.)\:(\d+)\}/g, (_, char, count) => {
    return char.repeat(Number(count));
  });
}
