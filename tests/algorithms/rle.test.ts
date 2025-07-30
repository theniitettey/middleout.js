import { compressWithRLE, decompressWithRLE } from "../../src/algorithms/rle";
import type { MiddleOutConfig } from "../../types";

const config: Partial<MiddleOutConfig> = {
  algorithm: "rle",
  preserveWhitespace: true,
  targetWeissman: 1.5,
};

describe("RLE Compression", () => {
  it("should compress repeating characters", () => {
    const input = "aaabbbccc";
    const result = compressWithRLE(input, config);
    expect(result.compressed).toBe("a3b3c3");
  });

  it("should decompress back to the original", () => {
    const input = "aaabbbccc";
    const compressed = compressWithRLE(input, config);
    const decompressed = decompressWithRLE(compressed.encoded);
    expect(decompressed).toBe(input);
  });

  it("should handle non-repeating characters", () => {
    const input = "abcdef";
    const result = compressWithRLE(input, config);
    expect(result.compressed).toBe("abcdef");
  });

  it("should handle mixed repetition", () => {
    const input = "aabcccccaaa";
    const result = compressWithRLE(input, config);
    expect(result.compressed).toBe("a2bc5a3");
    const decompressed = decompressWithRLE(result.encoded);
    expect(decompressed).toBe(input);
  });

  it("should strip whitespace if config.preserveWhitespace is false", () => {
    const input = "aa   bb";
    const noWhitespaceConfig = { ...config, preserveWhitespace: false };
    const result = compressWithRLE(input, noWhitespaceConfig);
    expect(result.compressed).toBe("a2b2");
  });
});
