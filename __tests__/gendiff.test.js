import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedStylishFormat = readFile('resultJsonFile.txt').trim();

test('check json stylish format', () => {
  const actual = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish');
  // console.log('actual', actual);
  expect(actual).toEqual(expectedStylishFormat);
});

test('check json stylish format', () => {
  const actual = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'stylish');
  // console.log('actual', actual);
  expect(actual).toEqual(expectedStylishFormat);
});