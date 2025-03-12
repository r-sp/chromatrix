import { randomColor, convertColor, convertCss } from "@repo/color/fn";

const initial = randomColor("rgb");

console.time("benchmark");

const color = {
  rgb: initial,
  hsl: convertColor(initial, "rgb", "hsl"),
  hwb: convertColor(initial, "rgb", "hwb"),
  lab: convertColor(initial, "rgb", "lab"),
  lch: convertColor(initial, "rgb", "lch"),
  oklab: convertColor(initial, "rgb", "oklab"),
  oklch: convertColor(initial, "rgb", "oklch"),
};

const css = {
  rgb: convertCss(color.rgb, "rgb"),
  hsl: convertCss(color.hsl, "hsl"),
  hwb: convertCss(color.hwb, "hwb"),
  lab: convertCss(color.lab, "lab"),
  lch: convertCss(color.lch, "lch"),
  oklab: convertCss(color.oklch, "oklab"),
  oklch: convertCss(color.oklab, "oklch"),
};

console.timeLog("benchmark", [color, css]);
