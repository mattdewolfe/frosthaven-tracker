import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT } from '../helpers';
import Scenario from './Scenario';

export default async ({ limit, page, id } = {}, client) => {

    if (id) {
        const query = `SELECT * FROM tracker.scenario WHERE id = ${id};`;
        return oneOrNoneQuery(client, query)
            .then((record) => {
                if (record) {
                    return Scenario.constructFromObject(record);
                }

                return null;
            });
    }
    else {
        const pageQuery = `SELECT * FROM tracker.scenario;`
        return paginateResults(client, client.manyOrNone, pageQuery, {}, {
            limit: limit || DEFAULT_LIMIT,
            page: page || DEFAULT_PAGE,
        })
            .then((records) => {
                /* eslint-disable-next-line no-param-reassign */
                return Array.from(records.items)
                    .map((item) => Scenario.constructFromObject(item));
            });
    }
};
