export default (dataset, validSchema = undefined) => {
    let sanitizedFields = {};

    if (validSchema) {
        Array.from(validSchema).forEach((field) => {
            if (!Object.prototype.hasOwnProperty.call(dataset, field)) {
                return;
            }

            sanitizedFields[field] = dataset[field];
        });
    } else {
        sanitizedFields = dataset;
    }

    Object.keys(sanitizedFields).forEach((field) => {
        if (sanitizedFields[field] === undefined) {
            delete sanitizedFields[field];
        }
    });

    return sanitizedFields;
};
