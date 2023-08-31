import StatusApplied from './StatusApplied';
import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT } from '../helpers';

export default async ({ limit, page, scenario_id, player_id, status_id, character_id } = {}, client) => {

    let query = `SELECT * FROM tracker.status_applied`;

    let searchTerms = [];
    if (scenario_id) {
        searchTerms.push(`scenario_id = ${scenario_id}`);
    }

    if (player_id) {
        searchTerms.push(`player_id = ${player_id}`);
    }

    if (status_id) {
        searchTerms.push(`status_id = ${status_id}`);
    }

    if (character_id) {
        searchTerms.push(`character_id = ${character_id}`);
    }

    if (searchTerms.length < 1) {
        query += ';';
    }
    else {
        query = `${query} WHERE ${searchTerms.join(' AND ')};`
    }

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    })
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => StatusApplied.constructFromObject(item));
        });
};
