
import _ from 'lodash';

const stringify = (value, depth = 1) => {
	if (!_.isObject(value)) {
		return value;
	}
	const keys = Object.keys(value);
	const getKeys = keys.map(
		(key) =>
			`${makeIndent(depth + 1)}  ${key}: ${stringify(
				value[key],
				depth + 1
			)}`
	);
	return `{\n${getKeys.join("\n")}\n  ${makeIndent(depth)}}`;
};


const makeIndent = (depth) => {
	const str = " ";
	return str.repeat(depth * 4 - 2);
};

const stylish = (data) => {
    const iter = (tree, depth) => tree.map((node) => {
        switch (node.type) {
            case 'added':
                return `${makeIndent(depth)}+ ${node.key}: ${stringify(
                    node.value,
                    depth,
                )}`;
            case 'deleted':
              return `${makeIndent(depth)}- ${node.key}: ${stringify(
                  node.value,
                  depth,
                )}`;
            case 'unchanged':
              return `${makeIndent(depth)}  ${node.key}: ${stringify(
                node.value,
                depth,
              )}`;
            case 'changed':
              return `${makeIndent(depth)}- ${
                node.key
              }: ${stringify(node.valueBefore, depth)}\n${makeIndent(depth)}+ ${node.key}: ${stringify(node.valueAfter, depth)}`;
            case 'nested':
              return `${makeIndent(depth)}  ${node.key}: {\n${iter(
                node.children,
                depth + 1,
                ).join("\n")}\n ${makeIndent(depth)} }`;
            default:
              throw new Error(`Unknown type: ${node.type}`);
        }
      })
  return `{\n${iter(data, 1).join('\n')}\n}`
};

export default stylish;
