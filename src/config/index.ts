import fs from "fs";
import path from "path";

import type { MiddleOutConfig } from "../../types";

export function loadConfig(): MiddleOutConfig {
  const configPath = path.resolve(process.cwd(), ".middleoutrc");
  const raw = fs.readFileSync(configPath, "utf-8");

  return JSON.parse(raw);
}
