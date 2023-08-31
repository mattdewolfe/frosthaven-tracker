import { noneQuery } from '../helpers';

export default async ({ scenario_id, player_id, character_id, status_ids } = {}, client) => {
    if (!scenario_id) {
        throw new Error("Scenario ID is required to add Status Applied");
    }
    else if (!player_id) {
        throw new Error("Player ID is required to add Status Applied");
    }
    else if (!character_id) {
        throw new Error("Character ID is required to add Status Applied");
    }
    else if (status_ids.length < 1) {
        throw new Error("No Status Ids provided for adding Status Applied");
    }

    let insertions = [];

    for (let i = 0; i < status_ids.length; i++) {
        insertions.push(`(${scenario_id}, ${player_id}, ${character_id}, ${status_ids[i]})`);
    }

    const query = `INSERT INTO tracker.status_applied(scenario_id, player_id, character_id, status_id) VALUES ${insertions.join(',')};`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        })
        .catch((e) => {
            throw new Error(e);
        });
};
