import { middleOutCompress, getWeissmanScore } from "../src";

describe("middleOut Compression", () => {
  it("compresses a basic string", () => {
    const input = "hooli hooli hooli hooli";
    const compressed = middleOutCompress(input);

    expect(compressed.length).toBeLessThan(input.length);
  });

  it("calculates a believable Weissman score", () => {
    const score = getWeissmanScore(1000, 123);
    expect(score).toBeGreaterThan(0);
  });
});
