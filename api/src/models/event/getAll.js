import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT } from '../helpers';
import Event from './Event';

export default async ({ limit, page, playerId, characterId } = {}, client) => {

    let query = `SELECT * FROM tracker.event`;

    if (playerId && characterId) {
        query = `${query} WHERE player_id = ${playerId} AND character_id = ${characterId};`;
    }
    else if (playerId) {
        query = `${query} WHERE player_id = ${playerId};`;
    }
    else if (characterId) {
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
                .map((item) => Event.constructFromObject(item));
        });
};
