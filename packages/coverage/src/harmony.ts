import { testing } from "./utils";

const { random, interpolate, iteration } = testing;

const input = random.ext();
const output: ReturnType<typeof interpolate.harmony>[] = [];

console.time("benchmark");

for (let i = 0; i < iteration; i++) {
  output.push(
    interpolate.harmony(input, [
      { name: "Complementary", ratio: [0, 180] },
      { name: "Analogous", ratio: [-30, 0, 30] },
      { name: "Triadic", ratio: [0, 120, 240] },
      { name: "Adjacent", ratio: [0, 150, 210] },
      { name: "Tetradic", ratio: [0, 90, 180, 270] },
      { name: "Rectangle", ratio: [0, 60, 180, 240] },
    ]),
  );
}

console.timeLog("benchmark", {
  origin: input,
  expect: output[0]?.[0]?.ratio,
});
