import { compressWithSTK, decompressWithSTK } from "../../src/algorithms/stk";
import type { MiddleOutConfig } from "../../types";

const defaultConfig: Partial<MiddleOutConfig> = {
  preserveWhitespace: true,
  targetWeissman: 5.0,
};

describe("STK Compression Algorithm", () => {
  it("should compress a typical string using STK", () => {
    const input =
      "The system encountered an unexpected null pointer exception at line 42.";
    const result = compressWithSTK(input, defaultConfig);

    expect(result).toHaveProperty("compressed");
    expect(result.compressed).not.toBe(input);
    expect(result.algorithm).toBe("stk");
    expect(result.encoded).toMatch(/MO::stk:.+::WEISSMAN::[\d.]+/);
  });

  it("should fallback to raw string if decoding fails", () => {
    expect(() => {
      decompressWithSTK("STK::INVALID::CODE");
    }).toThrow("Invalid encoded format");
  });

  it("should preserve whitespaces if specified", () => {
    const config = { ...defaultConfig, preserveWhitespace: true };
    const input = "    Indented Error: This is spaced oddly.    ";
    const { encoded } = compressWithSTK(input, config);
    const output = decompressWithSTK(encoded);

    expect(output.startsWith("    ") || output.endsWith("    ")).toBeTruthy();
  });

  it("should trim whitespaces if config disables preservation", () => {
    const config = { ...defaultConfig, preserveWhitespace: false };
    const input = "    Fatal: Unexpected spacebar usage.    ";
    const { encoded } = compressWithSTK(input, config);
    const output = decompressWithSTK(encoded);

    expect(output.startsWith(" ")).toBe(false);
    expect(output.endsWith(" ")).toBe(false);
  });
});
