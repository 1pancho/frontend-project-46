/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import buildTree from './buildTree.js'

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');

const genDiff = (file1, file2) => {
  const dataParse1 = JSON.parse(readFile(file1));
  const dataParse2 = JSON.parse(readFile(file2));
  const treeOfObjects = buildTree(dataParse1, dataParse2);

  const executeTypeValue = (tree) => {
    const result = tree.map((element) => {
      switch (element.type) {
        case 'deleted':
          return `- ${element.key}: ${element.value}`;
        case 'added':
          return `+ ${element.key}: ${element.value}`;
        case 'unchanged':
          return `  ${element.key}: ${element.value}`;
        case 'changed':
          return `- ${element.key}: ${element.valueBefore}\n+ ${element.key}: ${element.valueAfter}`;
        default:
          return null;
      }
    });
    const string = result.join('\n');
    return string;
  };

  return executeTypeValue(treeOfObjects);
};

export default genDiff;
