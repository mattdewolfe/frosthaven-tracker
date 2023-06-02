import {noneQuery} from '../helpers';

export default async ({name}, client) => {
    if (!name) {
        throw new Error("Name is required to create a Ministry");
    }

    const query = `INSERT INTO parliament.ministry(name) VALUES ('${name}');`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        })
        .catch((e) => {
            throw new Error(e);
        });
};
