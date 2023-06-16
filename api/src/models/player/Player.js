import Model, { QueryVariableType } from '../Model';

export default class Player extends Model {
    constructor(props) {
        super();

        // type: number
        this.id = props.id;

        // type: string
        this.player_name = props.player_name;

        // type: array
        this.characters = props.characters;

        // type: number
        this.current_character = props.current_character;
    }

    static checkQueryVariableType(name) {
        if (name === 'name') {
            return QueryVariableType.String;
        }
        else if (name === 'characters') {
            return QueryVariableType.Array;
        }

        return QueryVariableType.Number;
    }
}
