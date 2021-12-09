import jimp from 'jimp';

/**
 * Dithers an image using the Floyd-Steinberg algorithm.
 * @param {string} inputPath Path to a JPG, JPEG, or PNG image file.
 * @returns {Promise<Object>} Promise that resolves with Jimp image object.
 */
export default async function dither(inputPath) {
  return jimp
    .read(inputPath)
    .then((image) => {
      let {data, width: w} = image.bitmap;

      // Convert the input image to a grayscale colormap.
      for (let index = 0; index < data.length; index += 4) {
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];

        // Use the coefficients from GIMP’s grayscale algorithm, which accounts
        // for the human eye’s relatively sensitivity to green. We only assign
        // to the red channel since we will assign this value to the green and
        // blue channels in the next `for` loop.
        data[index] = r * 0.3 + g * 0.59 + b * 0.11;
      }

      // Iterate through each pixel, top to bottom and left to right, applying
      // the Floyd-Steinberg dithering algorithm for diffusing error among
      // nearby pixels.
      for (let index = 0; index <= data.length; index += 4) {
        const pixel = data[index];
        const newPixel = Math.round(pixel / 255) * 255;
        const error = Math.floor(data[index] - newPixel);

        data[index + 0] = newPixel;
        data[index + 1] = newPixel;
        data[index + 2] = newPixel;

        data[index - 0 + 4 * 1] += (error * 7) / 32;
        data[index - 4 + 4 * w] += (error * 3) / 32;
        data[index - 0 + 4 * w] += (error * 5) / 32;
        data[index + 4 + 4 * w] += (error * 1) / 32;
      }

      return image;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

/**
 * Write a Jimp image object to an output file.
 * @param {string} inputPath Path to the original image file.
 * @param {object} image Jimp image object.
 * @returns {string} Path to the new image file.
 */
export function write(inputPath, image) {
  // Insert “_dithered” after the file name before the file extension.
  const outputPath = inputPath.replace(/(\.[\w\d_-]+)$/i, '_dithered$1');
  image.write(outputPath);
  return outputPath;
}
