import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT } from '../helpers';
import DamageSource from './DamageSource';

export default async ({ limit, page } = {}, client) => {

    const query = `SELECT * FROM tracker.damage_source;`;

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    })
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => DamageSource.constructFromObject(item));
        });
};
