import Healing from './Healing';
import { getUpdateStatementKeys, noneQuery } from '../helpers';

export default async (params = {}, client) => {

    if (!params.id) {
        throw new Error('ID must be provided and be of type integer');
    }

    // Grab the id from params and remove it before batch parsing
    const id = params.id;
    delete params.id;

    let data = getUpdateStatementKeys(params, Healing.checkQueryVariableType);

    const query = `UPDATE tracker.healing SET ${data.keyValuePairs} WHERE id=${id};`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        },
            (e) => {
                throw new Error(e);
            });
};
