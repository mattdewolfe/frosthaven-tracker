import Model, { QueryVariableType } from "../Model";

export default class Event extends Model {
    constructor({
        character_id,
        creature_id,
        creature_level,
        scenario_level,
        overkill
    }) {
        super();

        // number
        this.character_id = character_id;
        // number
        this.creature_id = creature_id;
        // number
        this.creature_level = creature_level;
        // number
        this.scenario_level = scenario_level;
        // number
        this.overkill = overkill;
    }

    static checkQueryVariableType(name) {
        return QueryVariableType.Number;
    }
}