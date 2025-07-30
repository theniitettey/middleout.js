import { loadConfig } from "config";
import chalk from "chalk";
import type { MiddleOutConfig } from "../../types";
import {
  decompressWithRLE,
  decompressWithSTK,
  decompressWithTNT,
  decompressWithZPH,
  decompressWithMiddleOut,
} from "algorithms";

/**
 * Decompresses a string compressed by `middleOutCompress`.
 *
 * Supported formats:
 *   MO::<algorithm>:<data>::WEISSMAN::<score>
 *
 * If the format is unknown, we fall back to raw middle-out reversal.
 *
 * @param compressed - The encoded string.
 * @param options - Optional config override.
 * @returns The original string... or a legally distinct approximation of it.
 */
export function middleOutDecompress(
  compressed: string,
  options?: Partial<MiddleOutConfig>
): string {
  const config = { ...loadConfig(), ...options };

  const algoMatch = compressed.match(/^MO::(\w+):/);
  const algorithm = algoMatch?.[1];

  switch (algorithm) {
    case "rle":
      return decompressWithRLE(compressed);
    case "stk":
      return decompressWithSTK(compressed);
    case "tnt":
      return decompressWithTNT(compressed);
    case "zph":
      return decompressWithZPH(compressed);
    case "middle-out":
      return decompressWithMiddleOut(compressed);
    default:
      return decompressWithMiddleOut(compressed, true);
  }
}

export function decompress(encoded: string, algo: string, config: any) {
  switch (algo) {
    case "rle":
      return decompressWithRLE(encoded);
    case "stk":
      return decompressWithSTK(encoded);
    case "tnt":
      return decompressWithTNT(encoded);
    case "zph":
      return decompressWithZPH(encoded);
    case "middle-out":
      return decompressWithMiddleOut(encoded);
    default:
      console.log(
        chalk.yellow.bold("⚠️  Unsupported algorithm."),
        chalk.dim("Falling back to") +
          " " +
          chalk.green("middleout decompression") +
          "..."
      );

      const fallbackResult = decompressWithMiddleOut(encoded, true);

      console.log(chalk.cyan("\n🪄 Decompressed Result:"));
      console.log(chalk.whiteBright(fallbackResult));

      return fallbackResult;
  }
}
