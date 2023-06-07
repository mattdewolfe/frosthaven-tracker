// Change variable naming convention from underscore to camelcase
export default (dataset) => {
    const serializedObject = {};

    Object.keys(dataset).forEach((key) => {
        const serializedKey = String(key).replace(/(_\w)/g, (match) => match[1].toUpperCase());

        serializedObject[serializedKey] = dataset[key];
    });

    return serializedObject;
};
