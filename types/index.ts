export interface CompressionResult {
  original: string;
  compressed: string;
  weissmanScore: number;
}

export interface MiddleOutConfig {
  algorithm: "rle" | "stk" | "tnt" | "zph";
  aggressionLevel: number;
  preserveWhitespace: boolean;
  targetWeissman: number;
}
