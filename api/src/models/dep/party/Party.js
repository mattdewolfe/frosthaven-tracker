import Model, {QueryVariableType} from '../Model';

export default class Party extends Model {
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
        this.short = props.short;

        /**
         * @type {number}
         */
        this.members = props.members || 0;
    }

    static checkQueryVariableType(name) {
        if (name === 'id') {
            return QueryVariableType.Number;
        }

        return QueryVariableType.String;
    }
}
