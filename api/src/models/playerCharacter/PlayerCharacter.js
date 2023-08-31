import Model, { QueryVariableType } from '../Model';

export default class PlayerCharacter extends Model {
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
        this.player_id = props.player_id;

        /**
         * @type {number}
         */
        this.class_id = props.class_id;

        /**
        * @type {number}
        */
        this.xp = props.xp;

        /**
         * @type {number}
         */
        this.level = props.level;

        /**
         * @type {number}
         */
        this.perks = props.perks;

        /**
         * @type {number}
         */
        this.masteries = props.masteries;

        /**
         * @type {boolean}
         */
        this.retired = props.retired;
    }

    static checkQueryVariableType(name) {
        if (name === 'name') {
            return QueryVariableType.String;
        }
        else if (name === 'retired') {
            return QueryVariableType.Boolean;
        }

        return QueryVariableType.Number;
    }
}