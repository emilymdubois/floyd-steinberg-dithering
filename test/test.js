#!/usr/bin/env node

import test from 'tape';
import dither from '../index.js';

test('.jpeg', async (t) => {
  const {bitmap} = await dither('test/fixtures/test0.jpeg');
  const {width, height, data} = bitmap;

  t.equal(width, 256, 'width should be 256 pixels');
  t.equal(height, 256, 'height should be 256 pixels');
  t.equal(data[0], 255, 'first pixel should be black or white');
});

test('.png', async (t) => {
  const {bitmap} = await dither('test/fixtures/test1.png');
  const {width, height, data} = bitmap;

  t.equal(width, 512, 'width should be 512 pixels');
  t.equal(height, 512, 'height should be 512 pixels');
  t.equal(data[0], 0, 'first pixel should be black or white');
});
