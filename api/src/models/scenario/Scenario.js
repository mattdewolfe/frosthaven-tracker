import Model, { QueryVariableType } from '../Model';

export default class Scenario extends Model {
    constructor(props) {
        super();

        console.log(props);

        /**
         * @type {number}
         */
        this.id = props.id;

        /**
        * @type {string}
        */
        this.name = props.name;

        /**
         * @type {number}
         */
        this.scenario_number = props.scenario_number;

        /**
        * @type {number}
        */
        this.scenario_level = props.scenario_level;

        /**
         * @type {number}
         */
        this.outcome = props.outcome;
    }

    static checkQueryVariableType(name) {
        if (name === 'name') {
            return QueryVariableType.String;
        }

        return QueryVariableType.Number;
    }
}
