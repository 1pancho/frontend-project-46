/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'fs';
import _ from 'lodash';

const main = (obj1, obj2) => {
const buildTree = (obj1, obj2) => {
  const keysOfObj1 = _.keys(obj1);
  const keysOfObj2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keysOfObj1, keysOfObj2));

  const result = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        key,
        value: obj2[key],
        type: 'added',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        value: obj1[key],
        type: 'deleted',
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: compareData(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        valueBefore: obj1[key],
        valueAfter: obj2[key],
        type: 'changed',
      };
    }
    return {
      key,
      value: obj1[key],
      type: 'unchanged',
    };
  });

  return result;
};

const genDiff = (filepath1, filepath2) => {
  const dataParse1 = JSON.parse(readFileSync(filepath1, 'utf-8'));
  const dataParse2 = JSON.parse(readFileSync(filepath2, 'utf-8'));
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
}

export default main;

