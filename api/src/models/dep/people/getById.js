import {oneOrNoneQuery} from '../helpers';
import Person from './Person';

export default async ({id} = {}, client) => {
    if (!id) {
        throw new Error('Entity ID must be provided and be of type integer');
    }

    const query = `SELECT * FROM parliament.person WHERE id=${id};`;

    return oneOrNoneQuery(client, query)
        .then((person) => {
                if (person) {
                    return Person.constructFromObject(person);
                }
                else {
                    throw new Error("Entity Not Found");
                }
            },
            (e) => {
                throw new Error(e);
            });
};
