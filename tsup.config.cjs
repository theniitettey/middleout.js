import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["bin", "src", "types", "tests"],
  outDir: "dist",
  format: ["esm"],
  clean: true,
  dts: true,
  target: "node18",
  banner: {
    js: "#!/usr/bin/env node",
  },
  outExtension: () => ({
    js: ".js",
  }),
  external: ["commander", "events"],
});
