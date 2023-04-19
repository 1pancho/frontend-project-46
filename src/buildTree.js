import _ from 'lodash';


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

export default buildTree;