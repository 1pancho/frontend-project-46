import _ from 'lodash';

const stringify = (value) => {
    if (_.isObject(value)) {
        return '[complex value]';
    }
    return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
    const iter = (node) => {
    switch (node.type) {
        case 'add':
            return `Property ${node.key} was added with value: ${node.value}`;
        case 'deleted':
            return `Property ${node.key} was removed`;
        case 'unchanged':
            return `Property ${node.key} was unchanged`;
        case 'changed':
            return `Property ${node.key} was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`;
        case 'nested':
            return `Property ${node.children} was updated. From ${iter(stringify(node.valueBefore))} to ${iter(stringify(node.valueAfter))}`
        default:
          throw new Error(`Unknown type: ${node.type}`);
    }
    }
    return `{\n${iter(data).join('')}}`
};

export default plain;
