import {noneQuery, getUpdateStatementKeys} from '../helpers';
import Person from './Person';

export default async (params  = {}, client) => {

    if (!params.id) {
        throw new Error('Entity ID must be provided and be of type integer');
    }

    // Grab the id from params and remove it before batch parsing
    const id = params.id;
    delete params.id;

    let data = getUpdateStatementKeys(params, Person.checkQueryVariableType);

    const query = `UPDATE parliament.person SET ${data.keyValuePairs} WHERE id=${id};`;

    return noneQuery(client, query)
        .then((result) => {
                return result;
            },
            (e) => {
                throw new Error(e);
            });
};
