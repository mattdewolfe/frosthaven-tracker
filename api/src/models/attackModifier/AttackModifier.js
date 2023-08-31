import Model, { QueryVariableType } from '../Model';

export default class AttackModifier extends Model {
    constructor(props) {
        super();

        /**
         * @type {number}
         */
        this.id = props.id;

        /**
         * @type {string}
         */
        this.name = props.name;
    }

    static checkQueryVariableType(name) {
        if (name === 'name') {
            return QueryVariableType.String;
        }

        return QueryVariableType.Number;
    }
}
