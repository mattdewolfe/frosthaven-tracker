import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT} from '../helpers';
import CaucusMember from './CaucusMember';

export default async ({id, limit, page} = {}, client) => {

    if (!id) {
        throw new Error("Caucus Members request missing Id");
    }

    const manualCountQuery = `SELECT COUNT(id) FROM parliament.caucus_member WHERE caucus_id = ${id};`;
    const query = `WITH caucus AS (
                        SELECT
                            *
                        FROM
                            parliament.caucus_member
                        WHERE caucus_id = ${id}),
                    members AS (
                        SELECT
                            id as m_id,
                            province_id,
                            first_name,
                            last_name
                        FROM 
                            parliament.person)
                    
                    SELECT
                        *
                    FROM
                        caucus,
                        members
                    WHERE caucus.person_id = members.m_id;`;

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    }, manualCountQuery)
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => CaucusMember.constructFromObject(item));
        });
};
