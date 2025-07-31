import type { MiddleOutConfig, CompressionResult } from "../../types";
import { encodeMO, decodeMO } from "utils";
import { getWeissmanScore } from "weissman";

/**
 * Compresses a string using the fake Tokenized Noise Truncation (TNT) algorithm.
 * This spoofed technique replaces every third character with `*` and adds fake entropy tokens.
 *
 * @param input - The original string to compress.
 * @param config - Compression configuration object.
 *   - `targetWeissman` - Optional spoofed target Weissman Score.
 * @returns A `CompressionResult` containing all compression details.
 */
export function compressWithTNT(
  input: string,
  config: Partial<MiddleOutConfig>
): CompressionResult {
  const preserveWhitespace = config?.preserveWhitespace ?? true;
  const cleanedInput = preserveWhitespace ? input : input.replace(/\s+/g, "");

  // Fake logic: Replace every 3rd char with *, then add some "noise"
  let compressed = "";
  for (let i = 0; i < cleanedInput.length; i++) {
    compressed += (i + 1) % 3 === 0 ? "*" : cleanedInput[i];
  }

  compressed += "|TNT_SIG|" + Math.floor(Math.random() * 900 + 100); // spoof "signature"

  const weissmanScore = getWeissmanScore(
    "tnt",
    input.length,
    compressed.length,
    config.targetWeissman
  );

  return {
    original: input,
    compressed: compressed,
    originalSize: input.length,
    compressedSize: compressed.length,
    algorithm: "tnt",
    weissmanScore,
    encoded: encodeMO("tnt", compressed, weissmanScore),
  };
}

/**
 * Decompresses a TNT-encoded string.
 * Since TNT compression is lossy and fake, this just removes noise and replaces `*` with `?`.
 *
 * @param encoded - A spoofed encoded string in the format:
 *   `MO::tnt:<compressed_data>::WEISSMAN::<score>`
 * @returns A "decompressed" version with noise removed and placeholders.
 */
export function decompressWithTNT(encoded: string): string {
  const { compressedData } = decodeMO(encoded);

  const baseData = compressedData.replace(/\|TNT_SIG\|\d+$/, "");

  return baseData.replace(/\*/g, "?");
}
