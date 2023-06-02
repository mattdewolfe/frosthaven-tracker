import {DEFAULT_LIMIT, DEFAULT_PAGE, paginateResults} from '../helpers';
import Model from '../Model';

export default async ({id, limit, page} = {}, client) => {
    if (!id) {
        throw new Error('Entity ID must be provided and be of type integer');
    }

    const query = `SELECT
                    m.role_id,
                    m.caucus_id as id,
                    c.name
                FROM
                    parliament.caucus_member m
                    LEFT JOIN parliament.caucus c ON c.id = m.caucus_id
                WHERE m.person_id = ${id};`;

    const countQuery = `SELECT COUNT(*) FROM parliament.caucus_member WHERE person_id = ${id};`;

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    }, countQuery)
        .then((roleRecords) => {
                if (roleRecords) {
                    let res= Array.from(roleRecords.items)
                        .map((role) => Model.constructFromObject(role));

                    console.log(res);
                    return res;
                }
                else {
                    throw new Error("Entity Not Found");
                }
            },
            (e) => {
                throw new Error(e);
            });
};
