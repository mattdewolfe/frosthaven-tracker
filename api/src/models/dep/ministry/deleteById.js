import {noneQuery} from '../helpers';

export default async ({id} = {}, client) => {
    if (!id) {
        throw new Error(`Ministry Id is required for deletion`);
    }

    const query = `DELETE FROM parliament.ministry_member WHERE ministry_id=${id}; DELETE FROM parliament.ministry WHERE id=${id};`;

    return noneQuery(client, query)
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return "Ministry Deleted";
        })
        .catch((e) => {
            throw new Error(e);
        });
};
