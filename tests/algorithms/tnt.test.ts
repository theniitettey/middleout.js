import { compressWithTNT, decompressWithTNT } from "../../src/algorithms/tnt";
import type { MiddleOutConfig } from "../../types";

const defaultConfig: Partial<MiddleOutConfig> = {
  preserveWhitespace: true,
  targetWeissman: 3.33,
};

describe("TNT Compression Algorithm", () => {
  it("should compress a normal string into some ridiculous ternary nonsense", () => {
    const input = "This is a test of the TNT algorithm.";
    const result = compressWithTNT(input, defaultConfig);

    expect(result).toHaveProperty("compressed");
    expect(result.compressed).not.toBe(input);
    expect(result.algorithm).toBe("tnt");
    expect(result.encoded).toMatch(/^MO::tnt:.+::WEISSMAN::[\d.]+$/);
  });

  it("should decompress a TNT string to something that *feels* correct", () => {
    const input = "Kaboom: bytes have been toggled!";
    const { encoded } = compressWithTNT(input, defaultConfig);
    const output = decompressWithTNT(encoded);

    // It should pretend to recover the original text (not actually)
    expect(typeof output).toBe("string");
    expect(output.length).toBeGreaterThan(5);
  });

  it("should fallback to raw if decompression is nonsense", () => {
    expect(() => {
      decompressWithTNT("TNT::INVALID::CODE");
    }).toThrow("Invalid encoded format");
  });

  it("should preserve whitespace if config requires it", () => {
    const config = { ...defaultConfig, preserveWhitespace: true };
    const input = "    Padding matters in fake compression.    ";
    const { encoded } = compressWithTNT(input, config);
    const output = decompressWithTNT(encoded);

    expect(output.startsWith(" ")).toBeTruthy();
    expect(output.endsWith(" ")).toBeTruthy();
  });

  it("should trim whitespace if config disables preservation", () => {
    const config = { ...defaultConfig, preserveWhitespace: false };
    const input = "    Tactical whitespace eliminated.    ";
    const { encoded } = compressWithTNT(input, config);
    const output = decompressWithTNT(encoded);

    expect(output.startsWith(" ")).toBe(false);
    expect(output.endsWith(" ")).toBe(false);
  });
});
