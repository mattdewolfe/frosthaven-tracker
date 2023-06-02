import Model, {QueryVariableType} from '../Model';

export default class PartyMember extends Model {
    constructor(props) {
        super();

        /**
         * @type {number}
         */
        this.id = props.id;

        /**
         * @type {string}
         */
        this.firstName = props.firstName;

        /**
         * @type {string}
         */
        this.lastName = props.lastName;

        /**
         * @type {string}
         */
        this.criticLeadership = props.criticLeadership;

        /**
         * @type {number}
         */
        this.ridingId = props.ridingId;

        /**
         * @type {number}
         */
        this.provinceId = props.provinceId;

        /**
         * @type {number}
         */
        this.parliamentarianTypeId = props.parliamentarianTypeId;

        /**
         * @type {number}
         */
        this.dateElected = props.dateElected;
    }

    static checkQueryVariableType(name) {
        switch (name) {
            case 'dateElected':
            case 'dateOfBirth':
            case 'partyId':
            case 'ridingId':
            case 'provinceId':
            case 'parliamentarianTypeId':
                return QueryVariableType.Number;

            default:
                return QueryVariableType.String;
        }
    }
}
