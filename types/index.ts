export interface MiddleOutConfig {
  algorithm: "rle" | "stk" | "tnt" | "zph";
  wisemanOptimized?: boolean;
  aggressionLevel: number;
  preserveWhitespace: boolean;
  targetWeissman: number;
}

export interface CompressionResult {
  original: string;
  compressed: string;
  originalSize: number;
  compressedSize: number;
  algorithm: "rle" | "stk" | "tnt" | "zph" | "middle-out";
  weissmanScore: number;
  encoded: string;
}
