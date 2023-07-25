import { noneQuery, getInsertStatementKeys } from '../helpers';

export default async (params = {}, client) => {
    let data = getInsertStatementKeys(params);

    console.log(params);

    const query = `INSERT INTO tracker.healing(${data.keys}) VALUES (${data.values});`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        },
            (e) => {
                console.log(e);
                throw new Error(e);
            });
};
