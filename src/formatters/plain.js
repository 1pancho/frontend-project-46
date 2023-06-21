import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data, parent = '') => {
  const lines = data.flatMap((node) => {
    const path = parent ? `${parent}.${node.key}` : node.key;
    switch (node.type) {
      case 'added':
        return `Property '${path}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${path}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${path}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`;
      case 'nested':
        return plain(node.children, path);
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return lines.filter(Boolean).join('\n');
};

export default plain;
