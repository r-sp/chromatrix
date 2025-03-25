import { parseColor, parseCss, randomColor } from "@repo/color/fn";
import { createToken } from "../utils";

const token = createToken();
const input = {
  rgb: randomColor("rgb", token),
  hsl: randomColor("hsl", token),
  hwb: randomColor("hwb", token),
  lab: randomColor("lab", token),
  lch: randomColor("lch", token),
  oklab: randomColor("oklab", token),
  oklch: randomColor("oklch", token),
};
const output: {
  rgb: string;
  hsl: string;
  hwb: string;
  lab: string;
  lch: string;
  oklab: string;
  oklch: string;
}[] = [];

console.time("benchmark");

for (let i = 0; i < 1000; i++) {
  output.push({
    rgb: parseCss(input.rgb, true, true),
    hsl: parseCss(input.hsl, true, true),
    hwb: parseCss(input.hwb, true, true),
    lab: parseCss(input.lab, true, true),
    lch: parseCss(input.lch, true, true),
    oklab: parseCss(input.oklab, true, true),
    oklch: parseCss(input.oklch, true, true),
  });
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const parse = output[0]!;

const color = {
  rgb: parseColor(parse.rgb),
  hsl: parseColor(parse.hsl),
  hwb: parseColor(parse.hwb),
  lab: parseColor(parse.lab),
  lch: parseColor(parse.lch),
  oklab: parseColor(parse.oklab),
  oklch: parseColor(parse.oklch),
};

console.timeLog("benchmark", {
  origin: input,
  parsed: parse,
  expect: color,
});
