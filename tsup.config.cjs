import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["bin/cli.ts"],
  outDir: "dist",
  format: ["esm"],
  clean: true,
  dts: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
