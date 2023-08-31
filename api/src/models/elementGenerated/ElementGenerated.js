import Model, { QueryVariableType } from '../Model';

export default class ElementGenerated extends Model {
    constructor(props) {
        super();

        /**
         * @type {number}
         */
        this.id = props.id;

        /**
         * @type {number}
         */
        this.element_id = props.element_id;

        /**
         * @type {number}
         */
        this.scenario_id = props.scenario_id;

        /**
        * @type {number}
        */
        this.player_id = props.player_id;

        /**
        * @type {number}
        */
        this.character_id = props.character_id;
    }

    static checkQueryVariableType() {
        return QueryVariableType.Number;
    }
}
