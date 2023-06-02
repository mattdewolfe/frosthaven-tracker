import {paginateResults, DEFAULT_PAGE, DEFAULT_LIMIT} from '../helpers';
import PartyMember from "./PartyMember";

export default async ({id, limit, page} = {}, client) => {

    if (!id) {
        throw new Error("Party Id missing from Party data request");
    }

    const query = `SELECT * FROM parliament.person WHERE party_id=${id};`;

    return paginateResults(client, client.manyOrNone, query, {}, {
        limit: limit || DEFAULT_LIMIT,
        page: page || DEFAULT_PAGE,
    })
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => PartyMember.constructFromObject(item));
        });
};
