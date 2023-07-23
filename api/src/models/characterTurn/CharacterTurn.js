import Model, { QueryVariableType } from "../Model";

export default class Event extends Model {
    constructor({
        player_id,
        character_id,
        scenario_id,
        initiative,
        hexes_moved,
        long_rest,
        short_rest
    }) {
        super();

        // number
        this.player_id = player_id;
        // number
        this.character_id = character_id;
        // number
        this.scenario_id = scenario_id;
        // number
        this.initiative = initiative;
        // number
        this.hexes_moved = hexes_moved;
        // boolean
        this.long_rest = long_rest;
        // boolean
        this.short_rest = short_rest;
    }

    static checkQueryVariableType(name) {
        if (name === 'long_rest' || name === 'short_rest') {
            return QueryVariableType.Boolean;
        }

        return QueryVariableType.Number;
    }
}