import { loadConfig } from "config";
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
