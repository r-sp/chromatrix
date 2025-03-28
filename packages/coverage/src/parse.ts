import { testing } from "./utils";

const { random, parser, iteration } = testing;

const input = {
  rgb: random.color("rgb"),
  hsl: random.color("hsl"),
  hwb: random.color("hwb"),
  lab: random.color("lab"),
  lch: random.color("lch"),
  oklab: random.color("oklab"),
  oklch: random.color("oklch"),
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

for (let i = 0; i < iteration; i++) {
  output.push({
    rgb: parser.css(input.rgb),
    hsl: parser.css(input.hsl),
    hwb: parser.css(input.hwb),
    lab: parser.css(input.lab),
    lch: parser.css(input.lch),
    oklab: parser.css(input.oklab),
    oklch: parser.css(input.oklch),
  });
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const parse = output[0]!;

const color = {
  rgb: parser.color(parse.rgb),
  hsl: parser.color(parse.hsl),
  hwb: parser.color(parse.hwb),
  lab: parser.color(parse.lab),
  lch: parser.color(parse.lch),
  oklab: parser.color(parse.oklab),
  oklch: parser.color(parse.oklch),
};

console.timeLog("benchmark", {
  origin: input,
  parsed: parse,
  expect: color,
});
