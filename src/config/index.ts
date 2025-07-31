import fs from "fs";
import path from "path";
import type { MiddleOutConfig } from "../../types";

const defaultConfig: MiddleOutConfig = {
  algorithm: "middle-out",
  wisemanOptimized: true,
  aggressionLevel: 7,
  preserveWhitespace: false,
  targetWeissman: 5,
};

function validateConfig(config: any): config is MiddleOutConfig {
  if (typeof config !== "object" || config === null) {
    throw new Error("Config must be an object");
  }

  // Validate algorithm (required)
  if (!config.algorithm) {
    throw new Error("algorithm is required");
  }
  const validAlgorithms = ["rle", "stk", "tnt", "zph", "middle-out"];
  if (!validAlgorithms.includes(config.algorithm)) {
    throw new Error(`algorithm must be one of: ${validAlgorithms.join(", ")}`);
  }

  // Validate wisemanOptimized (optional)
  if (
    config.wisemanOptimized !== undefined &&
    typeof config.wisemanOptimized !== "boolean"
  ) {
    throw new Error("wisemanOptimized must be a boolean");
  }

  // Validate aggressionLevel (required)
  if (config.aggressionLevel === undefined || config.aggressionLevel === null) {
    throw new Error("aggressionLevel is required");
  }
  if (
    typeof config.aggressionLevel !== "number" ||
    config.aggressionLevel < 0 ||
    config.aggressionLevel > 10
  ) {
    throw new Error("aggressionLevel must be a number between 0 and 10");
  }

  // Validate preserveWhitespace (required)
  if (
    config.preserveWhitespace === undefined ||
    config.preserveWhitespace === null
  ) {
    throw new Error("preserveWhitespace is required");
  }
  if (typeof config.preserveWhitespace !== "boolean") {
    throw new Error("preserveWhitespace must be a boolean");
  }

  if (config.targetWeissman === undefined || config.targetWeissman === null) {
    throw new Error("targetWeissman is required");
  }
  if (typeof config.targetWeissman !== "number" || config.targetWeissman < 0) {
    throw new Error("targetWeissman must be a positive number");
  }

  return true;
}

/**
 * Load Middleout config to specify compressor behavior
 * By defualt a config is created for you if one is not found in your parent directory
 *
 * @param pathStr Optional: path to your middleout config `.middleoutrc`
 * @returns `MiddleOutConfig` object with your configurations
 */

export function loadConfig(pathStr: string = ""): MiddleOutConfig {
  const configPath = pathStr
    ? path.resolve(pathStr)
    : path.resolve(process.cwd(), ".middleoutrc");

  if (!fs.existsSync(configPath)) {
    // Create the file with default config pretty-printed
    fs.writeFileSync(
      configPath,
      JSON.stringify(defaultConfig, null, 2),
      "utf-8"
    );
    return defaultConfig;
  }

  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(raw);

    validateConfig(parsed);

    const config = { ...defaultConfig, ...parsed };

    return config;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        `Invalid JSON in config file ${configPath}: ${error.message}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Invalid config in ${configPath}: ${error.message}`);
    }
    throw error;
  }
}
