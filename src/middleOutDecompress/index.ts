import { loadConfig } from "config";
import type { MiddleOutConfig } from "../../types";

/**
 * Decompresses a string compresssed by middleOutCompress.
 * @param compressed Compressed string
 * @param options Optional config overide
 * @returns Original string approximation (we don't actally restore it, lol)
 */

export function middleOutDecompress(
  compressed: string,
  options?: Partial<MiddleOutConfig>
): string {
  const config = { ...loadConfig(), ...options };

  const core = compressed.replace(/μ/g, "");
  const expanded = core.split("").reverse().join("");

  return config.preserveWhitespace ? expanded : expanded.trim();
}
