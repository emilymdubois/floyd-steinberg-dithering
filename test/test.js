#!/usr/bin/env node

import test from 'tape';
import dither from '../index.js';

const PIXELS = [0, 255];

/**
 * Sample a random pixel from the image bitmap data.
 * @param {Array<number>} data Image bitmap data
 * @returns {number} Random pixel value
 */
function sample(data) {
  return data[Math.floor(Math.random() * data.length)];
}

test('.jpeg', async (t) => {
  const {bitmap} = await dither('test/fixtures/test0.jpeg');
  const {width, height, data} = bitmap;

  t.equal(width, 256, 'width should be 256 pixels');
  t.equal(height, 256, 'height should be 256 pixels');

  const pixel = sample(data);
  t.ok(PIXELS.includes(pixel), 'random pixel should be black or white');
});

test('.png', async (t) => {
  const {bitmap} = await dither('test/fixtures/test1.png');
  const {width, height, data} = bitmap;

  t.equal(width, 512, 'width should be 512 pixels');
  t.equal(height, 512, 'height should be 512 pixels');

  const pixel = sample(data);
  t.ok(PIXELS.includes(pixel), 'random pixel should be black or white');
});
