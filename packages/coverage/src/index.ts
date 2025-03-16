import { createPRNG, shuffleColor } from "@repo/color/fn";

const token = createPRNG(Date.now());

console.time("benchmark");

const color = shuffleColor(token);

console.timeLog("benchmark", color);
