import Model, { QueryVariableType } from '../Model';

export default class StatusEffect extends Model {
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

        /**
         * @type {string}
         */
        this.iconUrl = props.iconUrl;
    }

    static checkQueryVariableType(name) {
        if (name === 'name' ||
            name === 'iconUrl') {
            return QueryVariableType.String;
        }

        return QueryVariableType.Number;
    }
}
