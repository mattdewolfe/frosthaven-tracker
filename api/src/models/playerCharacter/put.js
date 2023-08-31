import { getUpdateStatementKeys, noneQuery } from '../helpers';
import PlayerCharacter from './PlayerCharacter';

export default async (params = {}, client) => {

    if (!params.id) {
        throw new Error('Character ID must be provided');
    }

    // Grab the id from params and remove it before batch parsing
    const id = params.id;
    delete params.id;

    let data = getUpdateStatementKeys(params, PlayerCharacter.checkQueryVariableType);

    const query = `UPDATE tracker.player_character SET ${data.keyValuePairs} WHERE id=${id};`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        },
            (e) => {
                throw new Error(e);
            });
};
