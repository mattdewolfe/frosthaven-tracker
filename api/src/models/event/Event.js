import Model, { QueryVariableType } from "../Model";

export default class Event extends Model {
    constructor({
        player_id,
        character_id,
        status_applied = [],
        status_received = [],
        healing_applied,
        healing_received,
        hexes_moved,
        elements_generated = [],
        cards_burned = 0,
        tokens_looted = 0
    }) {
        super();

        // number
        this.player_id = player_id;
        // number
        this.character_id = character_id;
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
        // array
        this.elements_generated = elements_generated;
        // number
        this.cards_burned = cards_burned;
        // number
        this.tokens_looted = tokens_looted;
    }

    static checkQueryVariableType(name) {
        if (name === 'status_applied' || name === 'status_received') {
            return QueryVariableType.Array;
        }

        return QueryVariableType.Number;
    }
}