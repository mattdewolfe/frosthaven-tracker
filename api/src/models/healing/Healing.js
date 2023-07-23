import Model, { QueryVariableType } from "../Model";

export default class Event extends Model {
    constructor({
        player_id,
        character_id,
        scenario_id,
        healing,
        cured_poison,
        cured_wound,
        cured_bain,
        cured_brittle
    }) {
        super();

        // number
        this.player_id = player_id;
        // number
        this.character_id = character_id;
        // number
        this.scenario_id = scenario_id;
        // number
        this.healing = healing;
        // boolean
        this.cured_poison = cured_poison;
        // boolean
        this.cured_wound = cured_wound;
        // boolean
        this.cured_bain = cured_bain;
        // boolean
        this.cured_brittle = cured_brittle;
    }

    static checkQueryVariableType(name) {
        if (name.indexOf('cured') !== -1) {
            return QueryVariableType.Boolean;
        }

        return QueryVariableType.Number;
    }
}