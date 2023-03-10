import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join('..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylishFormat = genDiff('resultJsonFile.txt').trim();

test('check json stylish format', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(actual).toEqual(expectedStylishFormat);
});

test('check plain format', () => {
  const sourceData = genDiff('resultJsonFile.txt');
  const expected = sourceData.trim();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(actual).toEqual(expected);
});

test('unknown format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const error = new Error("This format is not supported: 'txt'. Please read the documentation and use the available formats");
  expect(() => {
    genDiff(filepath1, filepath2, 'txt');
  }).toThrow(error);
});

