import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT} from '../helpers';
import Province from './Province';

export default async ({ limit, page} = {}, client) => {

    const query = `SELECT * FROM parliament.province;`;

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    })
        .then((provinceRecords) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(provinceRecords.items)
                .map((province) => Province.constructFromObject(province));
        });
};
