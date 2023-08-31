import Model, { QueryVariableType } from '../Model';

export default class Player extends Model {
    constructor(props) {
        super();

        // type: number
        this.id = props.id;

        // type: string
        this.name = props.name;

        // type: array
        this.characters = props.characters;
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
