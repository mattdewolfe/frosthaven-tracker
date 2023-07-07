import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT, oneOrNoneQuery } from '../helpers';
import Player from './Player';

export default async ({ limit, page, id, basic } = {}, client) => {
    if (basic) {
        const basicQuery = 'SELECT * FROM tracker.player;';

        return paginateResults(client, client.manyOrNone, basicQuery, {}, {
            limit: limit || DEFAULT_LIMIT,
            page: page || DEFAULT_PAGE,
        })
            .then((records) => {
                console.log(records);
                /* eslint-disable-next-line no-param-reassign */
                if (records.items) {
                    return Array.from(records.items)
                        .map((item) => Player.constructFromObject(item));
                }

                return [];
            })
            .catch(e => {
                throw new Error(e);
            });
    }
    else if (id) {
        const singleQuery = `
        WITH p AS (
            SELECT * FROM tracker.player WHERE id = ${id}
        ),
        pc AS (
            SELECT * FROM tracker.player_character WHERE player_id = ${id}
        )
        
        SELECT 
            p.id,
            p.name,
            COALESCE(string_agg (CAST(pc.class_id AS varchar), ', '), '') as characters
        FROM 
        tracker.player p,
        tracker.player_character pc
        WHERE 
        p.id = ${id}
        GROUP BY
        p.id;`

        return oneOrNoneQuery(client, singleQuery)
            .then((record) => {
                if (record) {
                    return Player.constructFromObject(record);
                }

                return null;
            })
            .catch(e => {
                throw new Error(e);
            });
    }
    else {
        const allQuery = `
        WITH p AS (
            SELECT * FROM tracker.player
        ),
        pc AS (
            SELECT * FROM tracker.player_character
        )
        
        SELECT 
            p.id,
            p.name,
            COALESCE(string_agg (CAST(pc.class_id AS varchar), ', '), '') as characters
        FROM 
        tracker.player p,
        tracker.player_character pc
        WHERE 
        p.id = pc.player_id
        GROUP BY
        p.id;`;

        return paginateResults(client, client.manyOrNone, allQuery, {}, {
            limit: limit || DEFAULT_LIMIT,
            page: page || DEFAULT_PAGE,
        })
            .then((records) => {
                console.log(records);
                /* eslint-disable-next-line no-param-reassign */
                if (records.items) {
                    return Array.from(records.items)
                        .map((item) => Player.constructFromObject(item));
                }

                return [];
            })
            .catch(e => {
                throw new Error(e);
            });
    }
};
