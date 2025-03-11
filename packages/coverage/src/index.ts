import { randomColor } from "@repo/color/fn";
import convertHex from "./color/hex";
import convertRgb from "./color/rgb";
import convertHsl from "./color/hsl";
import convertHwb from "./color/hwb";
import convertLab from "./color/lab";
import convertLch from "./color/lch";
import convertOklab from "./color/oklab";
import convertOklch from "./color/oklch";

const converter = () => {
  const color = randomColor("rgb");

  const hex = convertHex(color);
  const rgb = convertRgb(color);
  const hsl = convertHsl(color);
  const hwb = convertHwb(color);
  const lab = convertLab(color);
  const lch = convertLch(color);
  const oklab = convertOklab(color);
  const oklch = convertOklch(color);

  const log = (index: number) => {
    return {
      hex: hex[index],
      rgb: rgb[index],
      hsl: hsl[index],
      hwb: hwb[index],
      lab: lab[index],
      lch: lch[index],
      oklab: oklab[index],
      oklch: oklch[index],
    };
  };

  return {
    color: log(0),
    css: log(1),
    base: log(2),
  };
};

console.time("benchmark");

const test = converter();

console.timeLog("benchmark", test.css);
