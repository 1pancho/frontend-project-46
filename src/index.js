import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const dataParse1 = JSON.parse(readFileSync(filepath1, 'utf-8'));
  const dataParse2 = JSON.parse(readFileSync(filepath2, 'utf-8'));
  const genDiffFn = (dataParse1, dataParse2) => {
    const result = {};
    const keysOfObj1 = _.keys(dataParse1);
    const keysOfObj2 = _.keys(dataParse2);
    const keys = _.union(keysOfObj1, keysOfObj2);
    for (const key of keys) {
      if (!_.has(dataParse1, key)) {
        result[key] = '+';
      } else if (!_.has(dataParse2, key)) {
        result[key] = '-';
      } else if (dataParse1[key] !== dataParse2[key]) {
        result[key] = '-';
      } else {
        result[key] = '';
      }
    }

    return result;
  };

  return genDiffFn(dataParse1, dataParse2);
};

export default genDiff;
