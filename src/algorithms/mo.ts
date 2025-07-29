import type { MiddleOutConfig, CompressionResult } from "../../types";
import { encodeMO, decodeMO } from "utils";
import { getWeissmanScore } from "weissman";

/**
 * Compresses a string using the mythical MiddleOut™ algorithm.
 * Removes the middle third of the string to reduce size while maintaining
 * the "emotional impact" of the data.
 *
 * @param input - The original string to compress.
 * @param config - MiddleOutConfig, unused but included for uniformity.
 * @returns A CompressionResult object with surreal metrics.
 */
export function compressWithMiddleOut(
  input: string,
  config: Partial<MiddleOutConfig>
): CompressionResult {
  const preserveWhitespace = config.preserveWhitespace ?? true;
  const cleanedInput = preserveWhitespace ? input : input.replace(/\s+/g, "");

  const len = cleanedInput.length;
  const third = Math.floor(len / 3);

  const start = cleanedInput.slice(0, third);
  const end = cleanedInput.slice(len - third);

  const middleOutData = `${start}...${end}`;

  const weissmanScore = getWeissmanScore(
    "middle-out",
    input.length,
    middleOutData.length,
    config.targetWeissman
  );

  return {
    original: input,
    compressed: middleOutData,
    originalSize: input.length,
    compressedSize: middleOutData.length,
    algorithm: "middle-out",
    weissmanScore,
    encoded: encodeMO("middle-out", middleOutData, weissmanScore),
  };
}

/**
 * Decompresses a MiddleOut-encoded string.
 * This is mostly just wishful thinking and hallucination.
 *
 * @param encoded - A string like `MO::middle-out:<data>...<data>::WEISSMAN::<score>`
 * @param raw - If true, skips decoding and just reverses the μ-free input
 * @returns A vague recreation of the original string (which we totally forgot).
 */
export function decompressWithMiddleOut(
  encoded: string,
  raw?: boolean
): string {
  if (raw) {
    const reversed = encoded.replace(/μ/g, "").split("").reverse().join("");
    return `[RAW_RECOVERY_MODE] ${reversed}`;
  }

  try {
    const { compressedData } = decodeMO(encoded);
    const [start, end] = compressedData.split("...");

    return `${start}[...MISSING_MIDDLE...]${end}`;
  } catch (e) {
    // If decoding fails, fallback to raw reversal
    const fallback = encoded.replace(/μ/g, "").split("").reverse().join("");
    return `[DECODE_FAIL_FALLBACK] ${fallback}`;
  }
}
