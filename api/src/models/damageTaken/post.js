import { noneQuery, getInsertStatementKeys } from '../helpers';

export default async (params = {}, client) => {
    let data = getInsertStatementKeys(params);

    if (!params.source_id) {
        throw new Error("Missing source_id");
    }
    else if (!params.scenario_id) {
        throw new Error("Missing scenario_id");
    }
    else if (!params.character_id) {
        throw new Error("Missing character_id");
    }

    const query = `INSERT INTO tracker.damage_taken(${data.keys}) VALUES (${data.values});`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        },
            (e) => {
                throw new Error(e);
            });
};
