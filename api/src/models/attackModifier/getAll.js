import { paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT } from '../helpers';
import AttackModifier from './AttackModifier';

export default async ({ limit, page } = {}, client) => {

    const query = `SELECT * FROM tracker.attack_modifier;`;

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    })
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => AttackModifier.constructFromObject(item));
        });
};
