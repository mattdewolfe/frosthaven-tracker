import Model, {QueryVariableType} from '../Model';

export default class Riding extends Model {
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
         * @type {number}
         */
        this.ridingNumber = props.ridingNumber;
    }

    static checkQueryVariableType(name) {
        if (name === 'name') {
            return QueryVariableType.String;
        }

        return QueryVariableType.Number;
    }
}
