
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
            case 'add':
                return `${makeIndent(depth)}+ ${node.key}: ${stringify(
                    node.value,
                    depth,
                )}\n`;
            case 'deleted':
              return `${makeIndent(depth)}- ${node.key}: ${stringify(
                  node.value,
                  depth,
                )}\n`;
            case 'unchanged':
              return `${makeIndent(depth)} ${node.key}: ${stringify(
                node.value,
                depth,
              )}\n`;
            case 'changed':
              return `${makeIndent(depth)}- ${node.key}: ${stringify(node.valueBefore, depth)}\n+ ${node.key}: ${stringify(node.valueAfter, depth)}\n`;
            case 'nested':
              return `${makeIndent(depth)}  ${node.key}: {\n${iter(
                node.children,
                depth + 1,
                ).join("\n")}\n ${makeIndent(depth)} }`;
            default:
              throw new Error(`Unknown type: ${node.type}`);
        }
      })
  return `{\n${iter(data, 1).join('')}}`
}
                    
//                 'add' формируется строка добавления свойства.
// Для узла типа 'remove' формируется строка удаления свойства.
// Для узла типа 'same' формируется строка неизмененного свойства.
// Для узла типа 'updated' формируется строка измененного свойства, которое содержит и старое и новое значения.
// Для узла типа 'recursion' 


export default stylish;
