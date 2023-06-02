import {noneQuery} from '../helpers';

export default async ({id} = {}, client) => {
    if (!id) {
        throw new Error(`Committee Id is required for deletion`);
    }

    const query = `DELETE FROM parliament.committee_member WHERE committee_id=${id}; DELETE FROM parliament.committee WHERE id=${id};`;

    return noneQuery(client, query)
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return "Committee Deleted";
        })
        .catch((e) => {
            throw new Error(e);
        });
};
