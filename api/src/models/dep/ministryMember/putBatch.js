import {noneQuery} from '../helpers';

export default async (params, client) => {
    let query = '';

    for (let entry in params) {
        const roleId = Number(params[entry]);
        const memberId = Number(entry);

        query = `${query}UPDATE parliament.ministry_member SET role_id=${roleId} WHERE id=${memberId};`;
    }

    return noneQuery(client, query)
        .then((result) => {
            return result;
        })
        .catch((e) => {
            throw new Error(e);
        });
};
