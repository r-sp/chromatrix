import { defineConfig } from "tsup";

export default defineConfig({
  treeshake: true,
  splitting: true,
  entry: {
    convert: "./src/test/convert.ts",
    harmony: "./src/test/harmony.ts",
    parse: "./src/test/parse.ts",
    scales: "./src/test/scales.ts",
    shades: "./src/test/shades.ts",
    shuffle: "./src/test/shuffle.ts",
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
