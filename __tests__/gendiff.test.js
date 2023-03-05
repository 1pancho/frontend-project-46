import genDiff from '../src/index.js';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url); //import.meta содержит метаданные js модуля, такие как, например, базовый URL модуля. Т.о. мы можем понять где этот модуль лежит. Если мы запускаем запускаем, например, тест на локальном компьютере, то в этом import.meta.url будет храниться фактически путь до этого файла на компьютере (например, какой-то такой: file:///dirname/module.test.js)
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
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
