import { defineConfig } from "tsup";

export default defineConfig({
  treeshake: true,
  splitting: true,
  entry: {
    index: "./src/index.ts",
    utils: "./src/utils.ts",
    convert: "./src/lib/convert.ts",
    gamut: "./src/lib/gamut.ts",
    harmony: "./src/lib/harmony.ts",
    interpolate: "./src/lib/interpolate.ts",
    params: "./src/lib/params.ts",
    parse: "./src/lib/parse.ts",
    random: "./src/lib/random.ts",
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
