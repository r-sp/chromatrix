# CSS Color Converter in TypeScript
Effortlessly convert colors across a wide range of spaces, including the latest CSS Color Module Level 4 specifications.

## Features

### Converter
- [`converter`](./src/lib/convert.ts#L14): Conversion table lookup.
- [`convertColor`](./src/lib/convert.ts#L77): Convert current color to another color space.
- [`convertHue`](./src/lib/convert.ts#87): Convert current color to hue based color space.

### Parser
- [`parseColor`](./src/lib/parse.ts#L4): Convert css color to array.
- [`parseCss`](./src/lib/parse.ts#L64): Convert array to css color.

### Interpolate
- [`createShades`](./src/lib/interpolate.ts#L4): Generate color shades within range.
- [`createScales`](./src/lib/interpolate.ts#L28): Generate wide color shades with custom range.
- [`createHarmony`](./src/lib/harmony.ts#L4): Generate harmony color with custom ratio.

### Parameters
- [`createParams`](./src/lib/params.ts#L5): Generate URL Parameters from color.
- [`getParams`](./src/lib/params.ts#L23): Extract params to color mode and values.
- [`getValues`](./src/lib/params.ts#L38): Extract color values from params.
- [`getColor`](./src/lib/params.ts#L53): Generate color from extracted params.

### Misc
- [`colorGamut`](./src/lib/gamut.ts#L3): Default color range.
- [`colorRange`](./src/lib/gamut.ts#L43): Displayable color range.
- [`colorKind`](./src/lib/gamut.ts#L83): Default color space.
- [`createPNRG`](./src/lib/random.ts#L4): Create pseudo number random generator.
- [`createToken`](./src/lib/random.ts#L19): Create a token for PNRG with custom range.
- [`randomColor`](./src/lib/random.ts#L23): Generate random color with token.
- [`randomMode`](./src/lib/random.ts#L36): Generate random color mode with token.

## Color Spaces

### RGB
Mode: [`rgbToHex`](./src/mode/rgb.ts#L4), [`hexToRgb`](./src/mode/rgb.ts#L9).

| Channel | Range | Description |
| --- | --- | --- |
| `r` | `[0, 1]` | Red |
| `g` | `[0, 1]` | Green |
| `b` | `[0, 1]` | Blue |

### HSV
Mode: [`rgbToHsv`](./src/mode/hsv.ts#L3), [`hsvToRgb`](./src/mode/hsv.ts#L34).

| Channel | Range | Description |
| --- | --- | --- |
| `h` | `[0, 360]` | Hue |
| `s` | `[0, 1]` | Saturation |
| `v` | `[0, 1]` | Value |

### HSL
Mode: [`hsvToHsl`](./src/mode/hsl.ts#L3), [`hslToHsv`](./src/mode/hsl.ts#L14).

| Channel | Range | Description |
| --- | --- | --- |
| `h` | `[0, 360]` | Hue |
| `s` | `[0, 1]` | Saturation |
| `l` | `[0, 1]` | Lightness |

### HWB
Mode: [`hsvToHwb`](./src/mode/hwb.ts#L3), [`hwbToHsv`](./src/mode/hwb.ts#L14).

| Channel | Range | Description |
| --- | --- | --- |
| `h` | `[0, 360]` | Hue |
| `w` | `[0, 1]` | Blackness |
| `b` | `[0, 1]` | Whiteness |

### LRGB
Mode: [`rgbToLrgb`](./src/mode/lrgb.ts#L13), [`lrgbToRgb`](./src/mode/lrgb.ts#L21).

| Channel | Range | Description |
| --- | --- | --- |
| `r` | `[0, 1]` | Red |
| `g` | `[0, 1]` | Green |
| `b` | `[0, 1]` | Blue |

### LAB
Mode: [`xyz50ToLab`](./src/mode/lab.ts#L12), [`labToXyz50`](./src/mode/lab.ts#L32).

| Channel | Range | Description |
| --- | --- | --- |
| `l` | `[0, 100]` | Lightness |
| `a` | `[-100, 100]` | Green-Red |
| `b` | `[-100, 100]` | Blue-Yellow |

### LCH
Mode: [`labToLch`](./src/mode/lch.ts#L3), [`lchToLab`](./src/mode/lch.ts#L22).

| Channel | Range | Description |
| --- | --- | --- |
| `l` | `[0, 100]` | Lightness |
| `c` | `[0, 150]` | Chroma |
| `h` | `[0, 360]` | Hue |

### OKLAB
Mode: [`lrgbToOklab`](./src/mode/oklab.ts#L3), [`oklabToLrgb`](./src/mode/oklab.ts#L43).

| Channel | Range | Description |
| --- | --- | --- |
| `l` | `[0, 1]` | Lightness |
| `a` | `[-0.4, 0.4]` | Green-Red |
| `b` | `[-0.4, 0.4]` | Blue-Yellow |

### OKLCH
Mode: [`oklabToOklch`](./src/mode/oklch.ts#L3), [`oklchToOklab`](./src/mode/oklch.ts#L22).

| Channel | Range | Description |
| --- | --- | --- |
| `l` | `[0, 1]` | Lightness |
| `c` | `[0, 0.4]` | Chroma |
| `h` | `[0, 360]` | Hue |

### XYZ50
Mode: [`lrgbToXyz50`](./src/mode/xzy50.ts#L3), [`xyz50ToLrgb`](./src/mode/xzy50.ts#L27).

| Channel | Range | Description |
| --- | --- | --- |
| `x` | `[0, 0.964]` | ? |
| `y` | `[0, 0.999]` | ? |
| `z` | `[0, 0.825]` | ? |

### XYZ65
Mode: [`lrgbToXyz65`](./src/mode/xyz65.ts#L3), [`xyz65ToLrgb`](./src/mode/xyz65.ts#L27), [`xyz50ToXyz65`](./src/mode/xyz65.ts#L51), [`xyz65ToXyz50`](./src/mode/xyz65.ts#L75).

| Channel | Range | Description |
| --- | --- | --- |
| `x` | `[0, 0.950]` | ? |
| `y` | `[0, 1]` | ? |
| `z` | `[0, 1.088]` | ? |
