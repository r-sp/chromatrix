import { randomColor } from "@repo/color/random";
import convertRgb from "./color/rgb";
import convertHsl from "./color/hsl";
import convertHwb from "./color/hwb";
import convertLab from "./color/lab";
import convertHex from "./color/hex";

const color = randomColor("rgb");

convertRgb(color);
convertHsl(color);
convertHwb(color);
convertLab(color);
convertHex(color);
