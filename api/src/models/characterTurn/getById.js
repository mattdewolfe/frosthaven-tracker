import { oneOrNoneQuery } from '../helpers';
import CharacterTurn from './CharacterTurn';

export default async ({ id } = {}, client) => {

    const query = `SELECT * FROM tracker.character_turn WHERE id = ${id};`;

    return oneOrNoneQuery(client, singleQuery)
        .then((record) => {
            if (record) {
                return CharacterTurn.constructFromObject(record);
            }

            return null;
        });
};
