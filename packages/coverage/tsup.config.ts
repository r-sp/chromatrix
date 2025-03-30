import { defineConfig } from "tsup";

export default defineConfig({
  treeshake: true,
  splitting: true,
  entry: {
    index: "./src/index.ts",
    convert: "./src/convert.ts",
    gamut: "./src/gamut.ts",
    harmony: "./src/harmony.ts",
    params: "./src/params.ts",
    parse: "./src/parse.ts",
    scales: "./src/scales.ts",
    shades: "./src/shades.ts",
    shuffle: "./src/shuffle.ts",
  },
  dts: false,
  clean: true,
  minify: true,
  format: ["esm"],
  outDir: "dist",
  target: "esnext",
  platform: "node",
  sourcemap: false,
});
