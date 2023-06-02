// Change variable naming convention from camelcase to underscore
export default (dataset) => {
    const serializedObject = {};

    Object.keys(dataset).forEach((key) => {
        const serializedKey = String(key).replace(
            /[\w]([A-Z])/g,
            (match) => `${match[0].toLowerCase()}_${match[1].toLowerCase()}`,
        );

        serializedObject[serializedKey] = dataset[key];
    });

    return serializedObject;
};
