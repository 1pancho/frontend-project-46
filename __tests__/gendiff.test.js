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
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(actual).toEqual(expectedStylishFormat);
});

test('unknown format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const error = new Error("This format is not supported: 'txt'. Please read the documentation and use the available formats");
  expect(() => {
    genDiff(filepath1, filepath2, 'txt');
  }).toThrow(error);
});
