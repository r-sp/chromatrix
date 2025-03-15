import { createPRNG, randomColor, randomMode } from "@repo/color/fn";

console.time("benchmark");

const token = createPRNG(Date.now());

const mode = randomMode(token);
const color = randomColor(mode, token);

console.timeLog("benchmark", color);
