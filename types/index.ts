export interface CompressionResult {
  original: string;
  compressed: string;
  weissmanScore: number;
}

export interface MiddleOutConfig {
  aggressionLevel: number;
  preserveWhitespace: boolean;
  targetWeissman: number;
}
