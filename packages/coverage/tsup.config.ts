import { defineConfig } from "tsup";

export default defineConfig({
  treeshake: true,
  splitting: true,
  entry: {
    index: "./src/index.ts",
  },
  dts: true,
  clean: true,
  minify: true,
  format: ["esm"],
  outDir: "dist",
  target: "esnext",
  platform: "node",
  sourcemap: false,
});
