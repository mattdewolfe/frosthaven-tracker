import Model, { QueryVariableType } from "../Model";

export default class Event extends Model {
    constructor({
        player_id,
        character_id,
        damage_dealt,
        damage_received,
        damage_shielded,
        status_applied = [],
        status_received = [],
        healing_applied,
        healing_received,
        hexes_moved,
        traps_sprung,
    }) {
        super();

        // number
        this.player_id = player_id;
        // number
        this.character_id = character_id;
        // number
        this.damage_dealt = damage_dealt;
        // number
        this.damage_received = damage_received;
        // number
        this.damage_shielded = damage_shielded;
        // array[ids]
        this.status_applied = status_applied;
        // array[ids]
        this.status_received = status_received;
        // number
        this.healing_applied = healing_applied;
        // number
        this.healing_received = healing_received;
        // number
        this.hexes_moved = hexes_moved;
        // number
        this.traps_sprung = traps_sprung;
    }

    static checkQueryVariableType(name) {
        if (name === 'status_applied' || name === 'status_received') {
            return QueryVariableType.Array;
        }

        return QueryVariableType.Number;
    }
}