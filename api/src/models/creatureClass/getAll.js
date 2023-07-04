import { paginateResults, DEFAULT_PAGE } from '../helpers';
import CreatureClass from './CreatureClass';

export default async ({ limit, page } = {}, client) => {

    const query = `SELECT * FROM tracker.creature_class;`;

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || 99,
        page: page || DEFAULT_PAGE,
    })
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => CreatureClass.constructFromObject(item));
        });
};
