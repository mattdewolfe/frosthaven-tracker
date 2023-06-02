import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT, oneOrNoneQuery} from '../helpers';
import Ministry from './Ministry';

export default async ({id, limit, page} = {}, client) => {

    if (id) {
        const idQuery = `SELECT * FROM parliament.ministry WHERE id=${id};`;

        return oneOrNoneQuery(client, idQuery)
            .then((result) => {
                    if (result) {
                        return Ministry.constructFromObject(result);
                    }
                    else {
                        throw new Error("Minstry Not Found");
                    }
                },
                (e) => {
                    throw new Error(e);
                });
    }
    else {

        const manualCountQuery = 'SELECT COUNT(id) FROM parliament.ministry;';
        const query = `SELECT
                    mn.id,
                    mn.name,
                    mn.date_created,
                    COUNT (DISTINCT m.id) AS members
                FROM
                    parliament.ministry mn
                    LEFT JOIN parliament.ministry_member m ON m.ministry_id = mn.id
                GROUP BY 
                    mn.id;`;

        return paginateResults(client, client.manyOrNone, query, {}, {
            limit: limit || DEFAULT_LIMIT,
            page: page || DEFAULT_PAGE,
        }, manualCountQuery)
            .then((records) => {
                /* eslint-disable-next-line no-param-reassign */
                return Array.from(records.items)
                    .map((item) => Ministry.constructFromObject(item));
            });
    }
};
