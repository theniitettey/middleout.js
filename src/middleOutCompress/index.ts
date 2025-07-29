import { loadConfig } from "config";
import type { MiddleOutConfig } from "../../types";
import { getWeissmanScore } from "weissman";

/**
 * Compress input using the fake middle-out algorithm.
 * @param input The text to compress
 * @param options Optional config override
 * @returns Compressed string
 */

export function middleOutCompress(
  input: string,
  options?: Partial<MiddleOutConfig>
): string {
  const config = { ...loadConfig(), ...options };

  let compressed = input.split("").reverse().join("");

  if (!config.preserveWhitespace) {
    compressed = compressed.replace(/\s+/g, "");
  }

  const score = getWeissmanScore(input.length, compressed.length);

  console.log(`Weissman Score: ${score}`);
  return `μ${compressed.slice(0, input.length / config.aggressionLevel)}μ`;
}
