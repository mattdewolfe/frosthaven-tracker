import Model, { QueryVariableType } from '../Model';

export default class DamageTaken extends Model {
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
        this.scenario_id = props.scenario_id;

        /**
         * @type {number}
         */
        this.character_id = props.character_id;

        /**
         * @type {boolean}
         */
        this.modifier_card = props.modifier_card;

        /**
         * @type {boolean}
         */
        this.is_poisoned = props.is_poisoned;

        /**
         * @type {boolean}
         */
        this.is_brittle = props.is_brittle;

        /**
         * @type {boolean}
         */
        this.is_warded = props.is_warded;

        /**
         * @type {number}
         */
        this.shield = props.shield;

        /**
         * @type {boolean}
         */
        this.burned_card = props.burned_card;

        /**
         * @type {number}
         */
        this.damage = props.damage;
    }

    static checkQueryVariableType(name) {
        if (name === 'modifier_card') {
            return QueryVariableType.String;
        }
        else if (name === 'is_poisoned'
            || name === 'is_brittle'
            || name === 'is_warded'
            || name === 'burned_card') {
            return QueryVariableType.Boolean;
        }

        return QueryVariableType.Number;
    }
}
