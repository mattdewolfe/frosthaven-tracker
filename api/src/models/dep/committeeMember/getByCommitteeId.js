import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT} from '../helpers';
import CommitteeMember from './CommitteeMember';

export default async ({id, limit, page} = {}, client) => {

    if (!id) {
        throw new Error("Committee Members request missing Id");
    }

    const manualCountQuery = `SELECT COUNT(id) FROM parliament.committee_member WHERE committee_id = ${id};`;
    const query = `WITH committee AS (
                        SELECT
                            *
                        FROM
                            parliament.committee_member
                        WHERE committee_id = ${id}),
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
                        committee,
                        members
                    WHERE committee.person_id = members.m_id;`;

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    }, manualCountQuery)
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => CommitteeMember.constructFromObject(item));
        });
};
