import {noneQuery} from '../helpers';

export default async ({ministry_id, person_id, role_id}, client) => {
    if (!ministry_id) {
        throw new Error("Ministry Id is required to add Members");
    }

    let insertions = [];
    let persons = person_id.split(',');
    let roles = role_id.split(',');

    for (let i = 0; i < persons.length; i++) {
        insertions.push(`(${ministry_id}, ${persons[i]}, ${roles[i]})`);
    }

    const query = `INSERT INTO parliament.ministry_member(ministry_id, person_id, role_id) VALUES ${insertions.join(',')};`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        })
        .catch((e) => {
            throw new Error(e);
        });
};
