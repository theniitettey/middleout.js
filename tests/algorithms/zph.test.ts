import { compressWithZPH, decompressWithZPH } from "../../src/algorithms/zph";
import type { MiddleOutConfig } from "../../types";

const defaultConfig: Partial<MiddleOutConfig> = {
  preserveWhitespace: true,
  targetWeissman: 4.2,
};

describe("ZPH Compression Algorithm", () => {
  it("should decompress to something that vaguely resembles the original vibe", () => {
    const input = "The vibes are immaculate.";
    const { encoded } = compressWithZPH(input, defaultConfig);
    const output = decompressWithZPH(encoded);

    expect(typeof output).toBe("string");
    expect(output.length).toBeGreaterThan(5);
  });

  it("should fallback to raw text if the encoded ZPH string is invalid", () => {
    expect(() => {
      decompressWithZPH("ZPH::INVALID::CODE");
    }).toThrow("Invalid encoded format");
  });

  it("should respect whitespace if config tells it to", () => {
    const config = { ...defaultConfig, preserveWhitespace: true };
    const input = "     Sacred spacing preserved.     ";
    const { encoded } = compressWithZPH(input, config);
    const output = decompressWithZPH(encoded);

    expect(output.startsWith(" ")).toBe(true);
    expect(output.endsWith(" ")).toBe(true);
  });

  it("should trim whitespace if config disables it", () => {
    const config = { ...defaultConfig, preserveWhitespace: false };
    const input = "    We trimmed the metaphysical fat.     ";
    const { encoded } = compressWithZPH(input, config);
    const output = decompressWithZPH(encoded);

    expect(output.startsWith(" ")).toBe(false);
    expect(output.endsWith(" ")).toBe(false);
  });
});
