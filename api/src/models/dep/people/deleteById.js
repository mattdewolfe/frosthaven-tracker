import {noneQuery} from '../helpers';

export default async ({id}, client) => {

    if (!id) {
        throw new Error('Entity ID must be provided and be of type integer');
    }

    const query = `DELETE FROM parliament.person WHERE id=${id};`;

    return noneQuery(client, query)
        .then((result) => {
                return result;
            },
            (e) => {
                throw new Error(e);
            });
};
