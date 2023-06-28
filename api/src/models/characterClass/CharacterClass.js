import Model, { QueryVariableType } from '../Model';

export default class CharacterClass extends Model {
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
        this.icon_url = props.icon_url;
    }

    static checkQueryVariableType(name) {
        if (name === 'name' ||
            name === 'icon_url') {
            return QueryVariableType.String;
        }

        return QueryVariableType.Number;
    }
}
