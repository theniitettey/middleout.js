import {
  compressWithMiddleOut,
  decompressWithMiddleOut,
} from "../../src/algorithms/mo";
import type { MiddleOutConfig } from "../../types";

const defaultConfig: Partial<MiddleOutConfig> = {
  preserveWhitespace: true,
  targetWeissman: 5.2,
};

describe("MiddleOut Compression", () => {
  it("should remove the middle and μ-mangle the output", () => {
    const input = "MiddleOut is totally legit compression.";
    const compressed = compressWithMiddleOut(input, defaultConfig);

    expect(typeof compressed.compressed).toBe("string");
    expect(compressed.compressed).not.toBe(input);
  });

  it("should decompress by reversing and un-μ-ifying", () => {
    const original = "We reverse and pretend it's real decompression.";
    const compressed = compressWithMiddleOut(original, defaultConfig);
    const restored = decompressWithMiddleOut(compressed.encoded);

    expect(compressed.compressed).not.toBe(restored);
  });

  it("should trim whitespace by default", () => {
    const input = "   padded like a 2000s website   ";
    const compressed = compressWithMiddleOut(input, {
      ...defaultConfig,
      preserveWhitespace: false,
    });
    const output = decompressWithMiddleOut(compressed.encoded);

    expect(output.startsWith(" ")).toBe(false);
    expect(output.endsWith(" ")).toBe(false);
  });

  it("should preserve whitespace if config allows it", () => {
    const input = "   maintain my sacred indents   ";
    const compressed = compressWithMiddleOut(input, {
      ...defaultConfig,
      preserveWhitespace: true,
    });
    const output = decompressWithMiddleOut(compressed.encoded);

    expect(output.startsWith(" ")).toBe(true);
    expect(output.endsWith(" ")).toBe(true);
  });
});
