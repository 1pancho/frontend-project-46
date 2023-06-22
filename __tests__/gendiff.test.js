import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url); /* eslint no-underscore-dangle: 0 */
const __dirname = dirname(__filename); /* eslint no-underscore-dangle: 0 */

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedStylishFormat = readFile('resultStylish.txt');
const expectedPlainFormat = readFile('resultPlain.txt').trim();
const expectedJsonFormat = readFile('resultJson.txt');

test('check stylish format', () => {
  const actual = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish');
  // console.log('actual', actual);
  expect(actual).toEqual(expectedStylishFormat);
});

test('check plain format', () => {
  const actual = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain');
  // console.log('actual', actual);
  expect(actual).toEqual(expectedPlainFormat);
});

test('check json plain format', () => {
  const actual = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'json');
  // console.log('actual', actual);
  expect(actual).toEqual(expectedJsonFormat);
});

test('check default format', () => {
  const actual = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  // console.log('actual', actual);
  expect(actual).toEqual(expectedStylishFormat);
});
