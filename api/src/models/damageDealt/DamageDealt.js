import Model, { QueryVariableType } from '../Model';

export default class DamageDealt extends Model {
    constructor(props) {
        super();

        /**
         * @type {number}
         */
        this.id = props.id;

        /**
         * @type {number}
         */
        this.source_id = props.source_id;

        /** 
         * @type {number}
         */
        this.player_id = props.player_id;

        /**
         * @type {number}
         */
        this.scenario_id = props.scenario_id;

        /**
         * @type {number}
         */
        this.character_id = props.character_id;

        /**
         * @type {number}
         */
        this.modifier_id = props.modifier_id;

        /**
         * @type {number}
         */
        this.damage = props.damage;
    }

    static checkQueryVariableType(name) {
        return QueryVariableType.Number;
    }
}
