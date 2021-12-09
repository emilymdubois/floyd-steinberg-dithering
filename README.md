# floyd-steinberg-dithering

A Node.js Floyd-Steinberg dithering algorithm CLI.

Input | Output
--- | ---
![](./test/fixtures/test1.png) | ![](./test/fixtures/test1_dithered.png)

## Install

```sh
$ git clone git@github.com:emilymdubois/floyd-steinberg-dithering.git
$ cd floyd-steinberg-dithering
$ npm link
```

## Use

This CLI script expects a valid filepath to a JPEG or PNG image. The output of the dithering algorithm is written to a file of the same type, suffixed with `_dithered`, in the same directory as the input file.

```sh
$ floyd-steinberg-dithering path/to/file.png
# Output will be written to path/to/file_dithered.png
```

You can also create a symbolic link to use this library locally in another project.

```sh
$ cd another/project
$ npm link floyd-steinberg-dithering
```

```js
#!/usr/bin/env node

import ditherImage, {writeImage} from 'floyd-steinberg-dithering';

const inputPath = 'path/to/file.png';

ditherImage(inputPath)
  .then(image => {
    const outputPath = writeImage(inputPath, image);
  });w
```

## Test

```sh
$ npm test
```