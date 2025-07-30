import fs from "fs";
import path from "path";

import type { MiddleOutConfig } from "../../types";

const defaultConfig: MiddleOutConfig = {
  algorithm: "stk",
  wisemanOptimized: true,
  aggressionLevel: 7,
  preserveWhitespace: false,
  targetWeissman: 5,
};

export function loadConfig(): MiddleOutConfig {
  const configPath = path.resolve(process.cwd(), ".middleoutrc");

  if (!fs.existsSync(configPath)) {
    // Create the file with default config pretty-printed
    fs.writeFileSync(
      configPath,
      JSON.stringify(defaultConfig, null, 2),
      "utf-8"
    );
  }

  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw);
}
