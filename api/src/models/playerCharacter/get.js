import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT, oneOrNoneQuery } from '../helpers';
import PlayerCharacter from './PlayerCharacter';

export default async ({ limit, page, id, playerId } = {}, client) => {

    if (id) {
        const single = `SELECT * FROM tracker.player_character WHERE id = ${id};`;

        return oneOrNoneQuery(client, single)
            .then((record) => {
                if (record) {
                    return PlayerCharacter.constructFromObject(record);
                }

                return null;
            });
    }
    else {
        let allQuery = `SELECT * FROM tracker.player_character`;
        if (playerId) {
            allQuery += ` WHERE player_id = ${playerId};`;
        }
        else {
            allQuery += ';';
        }

        return paginateResults(client, client.manyOrNone, allQuery, {}, {
            limit: limit || DEFAULT_LIMIT,
            page: page || DEFAULT_PAGE,
        })
            .then((records) => {
                /* eslint-disable-next-line no-param-reassign */
                return Array.from(records.items)
                    .map((item) => PlayerCharacter.constructFromObject(item));
            });
    }
};
