import _ from 'lodash';

const stringify = (value) => {
    if (_.isObject(value)) {
        return '[complex value]';
    }
    return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
    const iter = (tree, parent = '') => tree.map((node) => {
    const path = parent ? `${parent}.${node.key}` : node.key;
    switch (node.type) {
        case 'add':
          return `Property ${path} was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property ${path} was removed`;
        case 'unchanged':
          return `Property ${path} was unchanged`;
        case 'changed':
          return `Property ${path} was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`;
        case 'nested':
          if (node.valueBefore) {
            return `${'\n'}${path}\\n${iter(node.children, path).join('\n')}`;
          }
          return `${iter(node.children, path).join('\n')}`;
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
})
    return `{\n${iter(data).join('')}}`
};

export default plain;
