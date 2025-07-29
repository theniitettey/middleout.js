import { loadConfig } from "config";
import type { MiddleOutConfig, CompressionResult } from "../../types";
import {
  compressWithMiddleOut,
  compressWithRLE,
  compressWithSTK,
  compressWithTNT,
  compressWithZPH,
} from "algorithms";
/**
 * Compresses the given input using the specified middle-out spoofed algorithm.
 *
 * This is not your grandma's compression utility — it's a Hollywood-level spoof
 * inspired by *Silicon Valley*, complete with a fake Weissman Score that can be tuned
 * using the config.
 *
 * Supported Algorithms:
 * - `"rle"`: Run-Length Encoding (because repeating letters are just lazy).
 * - `"stk"`: Stack Trace Kompression (for your inner Java debugger).
 * - `"tnt"`: Textual Noise Trimmer (it removes "um", "uh", and sometimes your soul).
 * - `"zph"`: Zero-Pattern Hider (because zeroes don't deserve to be seen).
 * - `"middle-out"`: The one, the myth, the legend.
 *
 * @param input - The raw input string that deserves to be "compressed".
 * @param options - Optional override for the global `.middleoutrc` config.
 *   @property algorithm - One of the spoofed algorithms to use (default: `"middle-out"`).
 *   @property aggressionLevel - A fake tuning param (1-10) to pretend you know what you're doing.
 *   @property preserveWhitespace - Whether to preserve whitespace (in case you're nostalgic).
 *   @property targetWeissman - Your dream Weissman Score (because fake it till you make it).
 *
 * @returns An object containing:
 *  - `original`: Your (might be actually more compressed) data
 * - `compressed`: Your industry standard compressed data
 *   - `originalSize`: How large your data used to be before we ruined it.
 *   - `compressedSize`: The size after our “compression magic”.
 *   - `algorithm`: The chosen algorithm used for compression.
 *   - `weissmanScore`: The spoofed Weissman Score (we promise it’s good).
 *   - `encoded`: The final encoded string in the MO spoof format.
 *
 * @example
 * ```ts
 * const result = middleOutCompress("helloooooo world", {
 *   algorithm: "rle",
 *   preserveWhitespace: true,
 *   aggressionLevel: 5,
 *   targetWeissman: 4.2,
 * });
 *
 * console.log(result.encoded);
 * // MO::rle:h1e1l2o6 1w1o1r1l1d1::WEISSMAN::4.20
 * ```
 */
export function middleOutCompress(
  input: string,
  options?: Partial<MiddleOutConfig>
): CompressionResult {
  const config = { ...loadConfig(), ...options };
  const algorithm = config.algorithm;

  switch (algorithm) {
    case "rle":
      return compressWithRLE(input, config);
    case "stk":
      return compressWithSTK(input, config);
    case "tnt":
      return compressWithTNT(input, config);
    case "zph":
      return compressWithZPH(input, config);
    default:
      return compressWithMiddleOut(input, config);
  }
}
