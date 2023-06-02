import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT, oneOrNoneQuery} from '../helpers';
import Caucus from './Caucus';

export default async ({id, limit, page} = {}, client) => {

    if (id) {
        const idQuery = `SELECT * FROM parliament.caucus WHERE id=${id};`;

        return oneOrNoneQuery(client, idQuery)
            .then((caucus) => {
                    if (caucus) {
                        return Caucus.constructFromObject(caucus);
                    }
                    else {
                        throw new Error("Caucus Not Found");
                    }
                },
                (e) => {
                    throw new Error(e);
                });
    }
    else {
        const manualCountQuery = 'SELECT COUNT(id) FROM parliament.caucus;';
        const query = `SELECT
                    c.id,
                    c.name,
                    c.date_created,
                    COUNT (DISTINCT m.id) AS members
                FROM
                    parliament.caucus c
                    LEFT JOIN parliament.caucus_member m ON m.caucus_id = c.id
                GROUP BY 
                    c.id;`;

        return paginateResults(client, client.manyOrNone, query, {}, {
            limit: limit || DEFAULT_LIMIT,
            page: page || DEFAULT_PAGE,
        }, manualCountQuery)
            .then((records) => {
                /* eslint-disable-next-line no-param-reassign */
                return Array.from(records.items)
                    .map((item) => Caucus.constructFromObject(item));
            });
    }
};
