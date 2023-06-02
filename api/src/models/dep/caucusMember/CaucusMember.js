import Model, {QueryVariableType} from '../Model';

export default class CaucusMember extends Model {
    constructor(props) {
        super();

        /**
         * @type {number}
         */
        this.id = props.id;

        /**
         * @type {number}
         */
        this.personId = props.personId;

        /**
         * @type {number}
         */
        this.roleId = props.roleId;

        /**
         * @type {number}
         */
        this.caucusId = props.caucusId;

        /**
         * @type {string}
         */
        this.firstName = props.firstName;

        /**
         * @type {string}
         */
        this.lastName = props.lastName;

        /**
         * @type {number}
         */
        this.provinceId = props.provinceId;
    }

    static checkQueryVariableType(name) {
        return QueryVariableType.Number;
    }
}
