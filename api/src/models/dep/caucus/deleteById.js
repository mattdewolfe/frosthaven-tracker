import {noneQuery} from '../helpers';

export default async ({id} = {}, client) => {

    if (!id) {
        throw new Error(`Caucus Id is required for deletion`);
    }

    const query = `DELETE FROM parliament.caucus_member WHERE caucus_id=${id}; DELETE FROM parliament.caucus WHERE id=${id};`;

    return noneQuery(client, query)
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return "Caucus Deleted";
        })
        .catch((e) => {
            throw new Error(e);
        });
};
