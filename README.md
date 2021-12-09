# floyd-steinberg-dithering

A command line interface (CLI) tool for executing a grayscale Floyd-Steinberg
dithering algorithm in Node.js.

| Input                          | Output                                  |
| ------------------------------ | --------------------------------------- |
| ![](./test/fixtures/test1.png) | ![](./test/fixtures/test1_dithered.png) |

## What does it do?

Dithering is the process of adding noise to an image. It can create the
appearance of shading when the color range is limited by strategically spacing
pixels, and is useful to reduce file size when image fidelity is not paramount.
The Floyd-Steinberg algorithm diffuses each pixel’s error to neighboring pixels,
which can create a visual “blending” effect.

## Installation

```sh
git clone git@github.com:emilymdubois/floyd-steinberg-dithering.git
cd floyd-steinberg-dithering
npm link
```

## Usage

This script expects a valid filepath to a JPEG or PNG image. The output of the
dithering algorithm is written to a file of the same type, suffixed with
`_dithered`, in the same directory as the input file.

```sh
$ floyd-steinberg-dithering path/to/file.png
# Output will be written to path/to/file_dithered.png
```

If you’d prefer to call the Node.js functions directly from a Node.js file, you
can use a symbolic link to import the functions as dependencies:

```sh
cd another/project
npm link floyd-steinberg-dithering
```

```js
#!/usr/bin/env node

import dither, {write} from 'floyd-steinberg-dithering';

const inputPath = 'path/to/file.png';

dither(inputPath).then((image) => {
  const outputPath = write(inputPath, image);
  console.log('Wrote dithered output to', outputPath);
});
```

## Testing

```sh
$ npm test
```
