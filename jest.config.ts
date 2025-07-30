import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  moduleNameMapper: {
    "^utils$": "<rootDir>/src/utils",
    "^weissman$": "<rootDir>/src/weissman",
    "^algorithms/(.*)$": "<rootDir>/src/algorithms/$1",
  },
};

export default config;
