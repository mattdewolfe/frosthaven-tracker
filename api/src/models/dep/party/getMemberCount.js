import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT} from '../helpers';

export default async ({limit, page} = {}, client) => {

    const query = `SELECT
                    p.id,
                    COUNT (DISTINCT mp.id) AS members
                FROM
                    parliament.party p
                    LEFT JOIN parliament.person mp ON mp.party_id = p.id
                GROUP BY 
                    p.id;`;

    const countQuery = 'SELECT COUNT(id) FROM parliament.party;';

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    }, countQuery)
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => item);
        });
};
