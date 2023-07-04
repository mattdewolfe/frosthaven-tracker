import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT } from '../helpers';
import CreatureKilled from './CreatureKilled';

export default async ({ limit, page, characterId } = {}, client) => {

    let query = `SELECT * FROM tracker.creature_killed`;

    if (characterId) {
        query = `${query} WHERE character_id = ${characterId};`;
    }
    else {
        query += ';';
    }
    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    })
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => CreatureKilled.constructFromObject(item));
        });
};
