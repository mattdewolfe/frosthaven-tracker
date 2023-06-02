import {noneQuery} from '../helpers';

export default async ({id, name, limit, page} = {}, client) => {
    if (!id || !name) {
        throw new Error(`Id: ${id}, Name: ${name} > cannot be used for a Ministry`);
    }

    const query = `UPDATE parliament.ministry SET name='${name}' WHERE id=${id};`;

    return noneQuery(client, query)
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return "Ministry Changes Saved";
        })
        .catch((e) => {
            throw new Error(e);
        });
};
