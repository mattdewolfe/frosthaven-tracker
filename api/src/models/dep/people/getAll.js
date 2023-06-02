import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT} from '../helpers';
import Person from './Person';

export default async ({limit, page} = {}, client) => {

    const query = `SELECT * FROM parliament.person p ORDER BY p.last_name, p.first_name;`;

    const countQuery = 'SELECT COUNT(*) FROM parliament.person;';

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    }, countQuery)
        .then((memberRecords) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(memberRecords.items)
                .map((member) => Person.constructFromObject(member));
        });
};
