import {
    paginateResults,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    getSelectStatementKeys
} from '../helpers';
import DamageTaken from './DamageTaken';

export default async (params = {}, client) => {

    const { page, limit, sort } = params;
    let query = `SELECT * FROM tracker.damage_taken`;
    let searchTerms = getSelectStatementKeys(params);

    if (searchTerms.length > 0) {
        query = `${query} WHERE ${searchTerms.join(' AND ')}`;
    }

    if (sort) {
        query = `${query} ${sort};`;
    }
    else {
        query += ';'
    }

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    })
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => DamageTaken.constructFromObject(item));
        });
};
