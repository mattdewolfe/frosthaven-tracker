import { noneQuery, getInsertStatementKeys } from '../helpers';

export default async (params = {}, client) => {
    let data = getInsertStatementKeys(params);

    const query = `INSERT INTO tracker.character_turn(${data.keys}) VALUES (${data.values});`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        },
            (e) => {
                console.log(e);
                throw new Error(e);
            });
};
