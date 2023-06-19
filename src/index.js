/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';
import parse from './parser.js';
import stylish from './formatters/stylish.js';
import format from './formatters/index.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const parsed1 = parse(data1, getFormat(filepath1));
  const parsed2 = parse(data2, getFormat(filepath2));
  const data = compareData(parsed1, parsed2);

  return format(data, formatName);
}
  // const dataParse1 = parser(readFile(file1));
  // const dataParse2 = parser(readFile(file2));
  // const treeOfObjects = buildTree(dataParse1, dataParse2);

//   const executeTypeValue = (tree) => {
//     const result = tree.map((element) => {
//       switch (element.type) {
//         case 'deleted':
//           return `- ${element.key}: ${element.value}`;
//         case 'added':
//           return `+ ${element.key}: ${element.value}`;
//         case 'unchanged':
//           return `  ${element.key}: ${element.value}`;
//         case 'changed':
//           return `- ${element.key}: ${element.valueBefore}\n+ ${element.key}: ${element.valueAfter}`;
//         default:
//           return null;
//       }
//     });
//     const string = result.join('\n');
//     return string;
//   };

//   return `{\n${executeTypeValue(data)}\n}`;
// };

export default genDiff;
