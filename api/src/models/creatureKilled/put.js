import { getUpdateStatementKeys, noneQuery } from '../helpers';
import CreatureKilled from './CreatureKilled';

export default async (params = {}, client) => {

    if (!params.id) {
        throw new Error('ID must be provided and be of type integer');
    }

    // Grab the id from params and remove it before batch parsing
    const id = params.id;
    delete params.id;

    let data = getUpdateStatementKeys(params, CreatureKilled.checkQueryVariableType);

    const query = `UPDATE tracker.creature_killed SET ${data.keyValuePairs} WHERE id=${id};`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        },
            (e) => {
                throw new Error(e);
            });
};
