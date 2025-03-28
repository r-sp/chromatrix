import { testing } from "./utils";

const { random, parameters, iteration } = testing;

const input = random.ext();
const output: {
  origin: typeof input;
  params: string;
  expect: typeof input;
}[] = [];

console.time("benchmark");

for (let i = 0; i < iteration; i++) {
  const currentParams = parameters.create(input);
  const [colorMode, searchParams] = parameters.extract(new URLSearchParams(currentParams));
  const currentColor = parameters.color(colorMode, parameters.value(searchParams));

  output.push({
    origin: input,
    params: currentParams,
    expect: currentColor,
  });
}

console.timeLog("benchmark", output[0]);
