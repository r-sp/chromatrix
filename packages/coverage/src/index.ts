import { randomColor, convertColor, formatCss } from "@repo/color/fn";

const initial = randomColor("rgb");

console.time("benchmark");

const color = {
  rgb: initial,
  hsl: convertColor(initial, "hsl"),
  hwb: convertColor(initial, "hwb"),
  lab: convertColor(initial, "lab"),
  lch: convertColor(initial, "lch"),
  oklab: convertColor(initial, "oklab"),
  oklch: convertColor(initial, "oklch"),
};

const css = {
  rgb: formatCss(color.rgb),
  hsl: formatCss(color.hsl),
  hwb: formatCss(color.hwb),
  lab: formatCss(color.lab),
  lch: formatCss(color.lch),
  oklab: formatCss(color.oklch),
  oklch: formatCss(color.oklab),
};

console.timeLog("benchmark", css);
