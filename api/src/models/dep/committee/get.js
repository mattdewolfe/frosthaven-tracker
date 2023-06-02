import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT, oneOrNoneQuery} from '../helpers';
import Committee from './Committee';

export default async ({id, limit, page} = {}, client) => {

    if (id) {
        const idQuery = `SELECT * FROM parliament.committee WHERE id=${id};`;

        return oneOrNoneQuery(client, idQuery)
            .then((result) => {
                    if (result) {
                        return Committee.constructFromObject(result);
                    }
                    else {
                        throw new Error("Committee Not Found");
                    }
                },
                (e) => {
                    throw new Error(e);
                });
    }
    else {

        const manualCountQuery = 'SELECT COUNT(id) FROM parliament.committee;';
        const query = `SELECT
                    c.id,
                    c.name,
                    c.date_created,
                    COUNT (DISTINCT m.id) AS members
                FROM
                    parliament.committee c
                    LEFT JOIN parliament.committee_member m ON m.committee_id = c.id
                GROUP BY 
                    c.id;`;

        return paginateResults(client, client.manyOrNone, query, {}, {
            limit: limit || DEFAULT_LIMIT,
            page: page || DEFAULT_PAGE,
        }, manualCountQuery)
            .then((records) => {
                /* eslint-disable-next-line no-param-reassign */
                return Array.from(records.items)
                    .map((item) => Committee.constructFromObject(item));
            });
    }
};
