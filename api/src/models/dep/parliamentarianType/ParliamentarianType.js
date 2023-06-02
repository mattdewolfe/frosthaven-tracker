import Model, {QueryVariableType} from '../Model';

export default class ParliamentarianType extends Model {
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
        if (name === 'id') {
            return QueryVariableType.Number;
        }

        return QueryVariableType.String;
    }
}
