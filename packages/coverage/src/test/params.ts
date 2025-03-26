import {
  createParams,
  getColor,
  getParams,
  getValues,
  randomColor,
  randomMode,
} from "@repo/color/fn";
import { createToken } from "../utils";

const token = createToken();
const mode = randomMode(token);
const input = randomColor(mode, token);
const output: {
  origin: typeof input;
  params: string;
  expect: typeof input;
}[] = [];

console.time("benchmark");

for (let i = 0; i < 1000; i++) {
  const currentParams = createParams(input);
  const [colorMode, searchParams] = getParams(new URLSearchParams(currentParams));
  const currentColor = getColor(colorMode, getValues(searchParams));

  output.push({
    origin: input,
    params: currentParams,
    expect: currentColor,
  });
}

console.timeLog("benchmark", output[0]);
