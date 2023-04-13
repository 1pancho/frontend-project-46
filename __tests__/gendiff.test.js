import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylishFormat = readFile('resultJsonFile.txt').trim();

test('check json stylish format', () => {
  const actual = genDiff(getFixturePath('filepath1.json'), getFixturePath('filepath2.json'), 'stylish');
  expect(actual).toEqual(expectedStylishFormat);
});

test('check plain format', () => {
  const sourceData = genDiff('resultJsonFile.txt');
  const expected = sourceData.trim();
  const actual = genDiff(getFixturePath('filepath.json'), getFixturePath('filepath.json'), 'stylish');
  expect(actual).toEqual(expected);
});

test('unknown format', () => {
  const filepath1 = getFixturePath('filepath.json');
  const filepath2 = getFixturePath('filepath.json');
  const error = new Error("This format is not supported: 'txt'. Please read the documentation and use the available formats");
  expect(() => {
    genDiff(filepath1, filepath2, 'txt');
  }).toThrow(error);
});

