import { formatCamelToUnder, sanitize, formatUnderToCamel } from './helpers/index.js';

export const QueryVariableType = {
    Number: 'number',
    String: 'string',
    Boolean: 'bool',
    Array: 'array'
};

export default class Model {
    getDatabaseFormat(validSchema = undefined) {
        return sanitize(formatCamelToUnder(this), validSchema);
    }

    static constructFromObject(object) {
        return new this(object);
    }

    // Used when iterating over variable names from HTTP request, this should be
    // used to inform on the expected types for given data and build proper queries.
    static checkQueryVariableType(name) {
        return QueryVariableType.Number;
    }

    constructor(fromObj) {
        if (fromObj) {
            let keys = Object.keys(fromObj);

            for (let entry of keys) {
                this[entry] = fromObj[entry];
            }
        }
    }
}
