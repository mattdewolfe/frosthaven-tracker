import { noneQuery } from '../helpers';

export default async ({ scenario_id, player_id, character_id, element_ids }, client) => {
    if (!scenario_id) {
        throw new Error("Scenario ID is required to add Element Generation");
    }
    else if (!player_id) {
        throw new Error("Player ID is required to add Element Generation");
    }
    else if (!character_id) {
        throw new Error("Character ID is required to add Element Generation");
    }
    else if (element_ids.length < 1) {
        throw new Error("No Element Ids provided for adding Element Generation");
    }

    let insertions = [];
    let elements = element_ids.split(',');

    for (let i = 0; i < elements.length; i++) {
        insertions.push(`(${scenario_id}, ${player_id}, ${character_id}, ${elements[i]})`);
    }

    const query = `INSERT INTO tracker.element_generated(scenario_id, player_id, character_id, element_id) VALUES ${insertions.join(',')};`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        })
        .catch((e) => {
            throw new Error(e);
        });
};
