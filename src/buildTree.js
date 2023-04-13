const buildTree = (obj1, obj2) => {
    return sortedKeys.map((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (!.has(obj1, key)) {
          return { type: 'added', key, val: value2 };
        }
        if (!.has(obj2, key)) {
          return { type: 'deleted', key, val: value1 };
        }
    })
};

obj1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
};

obj2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
};



