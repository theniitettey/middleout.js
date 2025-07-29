export interface CompressionResult {
  original: string;
  compressed: string;
  weissmanScore: number;
}

export interface MiddleOutConfig {
  algorithm: "rle" | "stk" | "tnt" | "zph";
  wisemanOptimized?: boolean;
  aggressionLevel: number;
  preserveWhitespace: boolean;
  targetWeissman: number;
}

export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  algorithm: "rle" | "stk" | "tnt" | "zph" | "middle-out";
  weissmanScore: number;
  encoded: string;
}
