#!/usr/bin/env node

import fs from 'fs';
import dither, {write} from '../index.js';

/**
 * Image file types supported by both this dithering algorithm and the `jimp`
 * library (https://github.com/oliver-moran/jimp#supported-image-types).
 */
const FILE_TYPES = ['jpeg', 'jpg', 'png'];

/**
 * Logs a console message and exits the process.
 * @param {string} [message] Message to log in the console.
 */
function handleError(message) {
  console.error(message || 'There was an issue processing the provided file.');
  process.exit(1);
}

/**
 * Runs the Floyd-Steinberg dithering algorithm on the image at the provided
 * filepath if it exists. Logs an error and exits the process if the image path
 * is not provided or does not reference a supported file type.
 */
function main() {
  const [inputPath] = process.argv.slice(2);

  if (inputPath) {
    try {
      fs.lstatSync(inputPath).isFile();

      const extension = inputPath.match(/\.([\w\d_-]+)$/i)[1];
      if (!FILE_TYPES.includes(extension.toLowerCase())) {
        throw new Error();
      }

      console.log(`Dithering ${inputPath}...`);
      dither(inputPath)
        .then((image) => {
          const outputPath = write(inputPath, image);
          console.log(`Dithered image written to ${outputPath}.`);
        })
        .catch(() => handleError());
    } catch (err) {
      handleError(`Must be a ${FILE_TYPES.join(', ')} file.`);
    }
  } else {
    handleError('Must be a valid file path.');
  }
}

main();
