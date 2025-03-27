# Coverage
This directory is dedicated for testing color packages.

## Build
To run the test, must build the source first.

```sh
pnpm build
```

## Development
To run other tests, be aware of new changes in the color package directory, these changes cannot be detected by the scope builder.

```sh
pnpm dev
```

## Testing

```sh
# test convertColor();
node dist/convert.js

# test convertColor(); with output as color space.
node dist/shuffle.js

# test parseCss(); and parseColor();
node dist/parse.js

# test createShades();
node dist/shades.js

# test createScales();
node dist/scales.js

# test createHarmony();
node dist/harmony.js

# test createParams(); getParams(); getValues(); and getColor();
node dist/params.js
```