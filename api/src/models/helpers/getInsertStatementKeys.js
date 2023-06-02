export default (dataset) => ({
    keys: Array.from(Object.keys(dataset)).join(', '),
    values: Array.from(Object.keys(dataset)).map((value) => `'${dataset[value]}'`).join(', '),
});
