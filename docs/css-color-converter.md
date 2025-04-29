# CSS Color Converter
Type-safe conversions between all [CSS Color Module Level 4](https://drafts.csswg.org/css-color/) formats.

## Features

### Converter
- Convert current color to another color space.
  ```ts
  convertColor(["rgb", 1, 1, 1], "hsl");
  ```
- Convert current color to hue based color space.
  ```ts
  convertHue(["rgb", 1, 1, 1]);
  ```

### Parser
- Convert css color to current color.
  ```ts
  parseColor("#ffffff");
  ```
- Convert current color to css color.
  ```ts
  parseCss(["rgb", 1, 1, 1]);
  ```

### Composer
Combine any color converter as single function.
```ts
const lchToOklch = compose(oklabToOklch, lrgbToOklab, xyz65ToLrgb, xyz50ToXyz65, labToXyz50, lchToLab);

const lch = [100, 100, 360] as ColorSpace<"lch">;
const oklch = lchToOklch(lch);
```

> [!NOTE]
> The functions are sorted from right to left, the composer uses [`Array.prototype.reduceRight`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) to combine provided functions into single function. See: [supported color mode](#color-spaces).

### Interpolate
- Generate color shades within range.
  ```ts
  createShades("#ffffff", "#000000", 10);
  ```
- Generate wide color shades with custom range.
  ```ts
  createScales(["#ffffff", "#808080", "#000000"], 10);
  ```
- Generate harmony color with custom ratio.
  ```ts
  createHarmony(["rgb", 1, 1, 1], [
    { name: "Complementary", ratio: [0, 180] },
    { name: "Analogous", ratio: [-30, 0, 30] },
    { name: "Triadic", ratio: [0, 120, 240] },
    { name: "Adjacent", ratio: [0, 150, 210] },
    { name: "Tetradic", ratio: [0, 90, 180, 270] },
    { name: "Rectangle", ratio: [0, 60, 180, 240] },
  ]);
  ```

### Pseudo Color Random Generator

- Create pseudo number random generator.
  ```ts
  const date = new Date();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const token = createPNRG(minutes + seconds);
  ```
- Create a token for PNRG with custom range.
  ```ts
  const pnrg = createPNRG(Date.now());

  const r = createToken(pnrg, 0, 1);
  const g = createToken(pnrg, 0, 1);
  const b = createToken(pnrg, 0, 1);

  const color = ["rgb", r, g, b];
  ```
- Generate random color with token.
  ```ts
  const token = createPNRG(Date.now());

  const color = randomColor("rgb", token);
  ```
- Generate random color mode with token.
  ```ts
  const token = createPNRG(Date.now());
  
  const mode = randomMode(token);

  const color = randomColor(mode, token);
  ```

### Color as URL Parameters
- Generate params from color.
  ```ts
  const colorParams = createParams(["rgb", 1, 1, 1]);
  ```
- Extract params to color mode and values.
  ```ts
  const colorParams = new URLSearchParams("?rgb=1,1,1");

  const [colorMode, searchParams] = getParams(colorParams);
  ```
- Generate color from extracted params.
  ```ts
  const colorParams = createParams(["rgb", 1, 1, 1]);

  const params = new URLSearchParams(colorParams);

  const [colorMode, searchParams] = getParams(params);

  const values = getValues(searchParams);

  const color = getColor(colorMode, values);
  ```

### Color Matrix

Two distinct pathways for converting between LAB and OKLAB color spaces, both relying on intermediate transformations through RGB and XYZ spaces, but differing in the specific XYZ standard used (XYZ50 vs. XYZ65).

- via [XYZ50](#xyz50).
  ```ts
  const labToOklab = compose(lrgbToOklab, xyz50ToLrgb, labToXyz50);
  const oklabToLab = compose(xyz50ToLab, lrgbToXzy50, oklabToLrgb);
  ```
  - This approach uses the D50 standard illuminant throughout the process.
  - D50 is often preferred in color management workflows, particularly in printing and graphic arts, where accurate color reproduction is crucial.
- via [XYZ65](#xyz65).
  ```ts
  const labToOklab = compose(lrgbToOklab, xyz65ToLrgb, xyz50ToXyz65, labToXyz50);
  const oklabToLab = compose(xyz50ToLab, xyz65ToXyz50, lrgbToXyz65, oklabToLrgb);
  ```
  - This approach introduces a conversion between XYZ50 and XYZ65.
  - D65 is commonly used in display technologies and web applications.
  - By including the conversion between XYZ50 and XYZ65, this path takes into account the different white points.

Both conversion paths are valid, and the choice depends on the specific requirements of your application. The XYZ65 path, by taking into account the more commonly used display standard, may be the preferred choice in many situations.

### Tuple-Centric Design
The pervasive use of object literals, while offering dynamic key-value mapping, often obscures the inherent structural intent of data. In contexts demanding deterministic cardinality and type homogeneity, tuples emerge as a powerful abstraction.

- **Formalized Structural Invariants**:
  Tuples impose a strict, compile-time enforced schema. This eliminates the runtime ambiguity associated with optional or dynamically assigned object properties, promoting predictable data topologies.
- **Optimized Memory Layout and Access Patterns**:
  The contiguous memory allocation inherent in tuples facilitates optimized indexing operations. This is especially relevant in numerical computation or real-time data processing, where minimizing access latency is critical.
- **Type-Level Refinement and Invariant Preservation**:
  TypeScript's type system leverages tuples to achieve fine-grained type specialization. This enables the encoding of complex data invariants directly within the type signature, enhancing code robustness and reducing the likelihood of runtime type errors.
- **Destructuring as a Syntactic Catalyst**:
  Tuple destructuring provides an elegant mechanism for extracting and binding structured data to symbolic names. This syntactic sugar enhances code readability and conciseness, particularly when dealing with multi-valued return types or complex data transformations.

Drawing inspiration from the robust color manipulation capabilities of [Culori](https://github.com/Evercoder/culori), we have implemented a suite of color transformation functions predicated on tuple-based color representations.

This design choice allows for the creation of optimized, structurally rigid color pipelines, leveraging custom functions to achieve unique color manipulations that diverge from standard object implementations. This tuple first approach allows for very performant color manipulation.

See: [Coverage](../coverage/README.md).

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