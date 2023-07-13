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
        this.scenario_id = props.scenario_id;

        /**
         * @type {number}
         */
        this.character_id = props.character_id;

        /**
         * @type {number}
         */
        this.attack_value = props.attack_value;

        /**
         * @type {string}
         */
        this.modifier_card = props.modifier_card;

        /**
         * @type {boolean}
         */
        this.target_poisoned = props.target_poisoned;

        /**
         * @type {boolean}
         */
        this.target_brittle = props.target_brittle;

        /**
         * @type {boolean}
         */
        this.target_warded = props.target_warded;

        /**
         * @type {number}
         */
        this.target_shield = props.target_shield;

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
        else if (name === 'target_poisoned'
            || name === 'target_brittle'
            || name === 'target_warded'
            || name === 'burned_card') {
            return QueryVariableType.Boolean;
        }

        return QueryVariableType.Number;
    }
}
