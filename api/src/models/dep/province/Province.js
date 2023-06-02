import Model, {QueryVariableType} from '../Model';

export default class Province extends Model {
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
        this.english = props.english;

        /**
         * @type {string}
         */
        this.french = props.french;

        /**
         * @type {string}
         */
        this.international = props.international;

        /**
         * @type {number}
         */
        this.geoCode = props.geoCode;

        /**
         * @type {string}
         */
        this.region = props.region;
    }

    static checkQueryVariableType(name) {
        switch (name) {
            case 'geo_code':
                return QueryVariableType.Number;

            default:
                return QueryVariableType.String;
        }
    }
}
