export default (dataset, typeCheckFunc) => ({
    keyValuePairs: Array.from(Object.keys(dataset)).map(
        (value, index) => {
            if (typeCheckFunc && typeof(typeCheckFunc) === 'function') {
                if (typeCheckFunc(value) === 'number') {
                    return `${value} = ${dataset[value] ? dataset[value] : 0}`;
                }
            }

            return `${value} = '${dataset[value]}'`;
        },
    ).join(', '),
    oid: `$${Object.keys(dataset).length + 1}`,
});
