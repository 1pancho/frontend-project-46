/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';
import parse from './parser.js';
import stylish from './stylish.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (file1, file2) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const parsed1 = parse(data1, getFormat(file1));
  const parsed2 = parse(data2, getFormat(file2));
  const data = compareData(parsed1, parsed2);
  const newData = stylish(data);

  return newData;
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
