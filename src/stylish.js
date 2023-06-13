
const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const entries = Object.entries(currentValue);
    const indent = replacer.repeat(spacesCount * depth);

    const arrEl = entries.reduce((acc, [key, val]) => {
      if (typeof val === 'object') {
        val = iter(val, depth + 1);
      }
      return acc.concat(`${indent}${key}: ${val}\n`);
    }, []);

    return `{\n${arrEl.join('')}${replacer.repeat(spacesCount * depth - spacesCount)}}`;
  };
  return iter(value, 1);
};

const stylish = (data) => {
    const iter = (tree, depth) => tree.map((node) => {
        switch (node.type) {
            case 'add':
                return `${currentIndent(depth)}+ ${node.key}: ${stringify(
                    node.value,
                    depth,
                )}\n`;
            case 'remove':
              return `${currentIndent(depth)}- ${node.key}: ${stringify(
                  node.value,
                  depth,
                )}\n`;
            case 'same':
              return `${currentIndent(depth)} ${node.key}: ${stringify(
                node.value,
                depth,
              )}\n`;
            case 'updated':
              return `${currentIndent(depth)}- ${node.key}: ${stringify(node.valueBefore, depth)}\n+ ${node.key}: ${stringify(node.valueAfter, depth)}\n`;
            case 'recursion':
              return `${makeIndent(depth)}  ${value.key}: {\n${value.children
                .map((val) => stylish(val, depth + 1))
                .join("\n")}\n ${makeIndent(depth)} }`;
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


export { stylish, stringify };
