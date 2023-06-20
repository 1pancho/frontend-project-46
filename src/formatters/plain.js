import _ from 'lodash';

const stringify = (value) => {
    if (_.isObject(value)) {
        return '[complex value]';
    }
    return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (tree, parent = '') => {
  const lines = [];
  tree.forEach((node) => {
    const path = parent ? `${parent}.${node.key}` : node.key;
    switch (node.type) {
      case 'add':
        lines.push(`Property '${path}' was added with value: ${stringify(node.value)}`);
        break;
      case 'deleted':
        lines.push(`Property '${path}' was removed`);
        break;
      case 'unchanged':
        lines.push(`Property '${path}' was unchanged`);
        break;
      case 'changed':
        lines.push(`Property '${path}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`);
        break;
      case 'nested':
        lines.push(...iter(node.children, path));
        break;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return lines;
};

return iter(data).join('\n');
};

export default plain;
