import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT, oneOrNoneQuery } from '../helpers';
import Player from './Player';

export default async ({ limit, page, id, activeOnly } = {}, client) => {

    if (id) {
        let single = `SELECT * FROM tracker.player_character WHERE id = ${id}`;
        // Add check for retired only if desired.
        single = activeOnly ? `${single} AND retired = false;` : `${single};`;

        return oneOrNoneQuery(client, singleQuery)
            .then((record) => {
                if (record) {
                    return Player.constructFromObject(record);
                }

                return null;
            });
    }
    else {
        const allQuery = `SELECT * FROM tracker.player;`;

        return paginateResults(client, client.manyOrNone, allQuery, {}, {
            limit: limit || DEFAULT_LIMIT,
            page: page || DEFAULT_PAGE,
        })
            .then((records) => {
                /* eslint-disable-next-line no-param-reassign */
                return Array.from(records.items)
                    .map((item) => Player.constructFromObject(item));
            });
    }
};
