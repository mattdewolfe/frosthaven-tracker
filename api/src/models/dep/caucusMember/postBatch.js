import {noneQuery} from '../helpers';

export default async ({caucus_id, person_id, role_id}, client) => {
    if (!caucus_id) {
        throw new Error("Caucus Id is required to add Members");
    }

    let insertions = [];
    let persons = person_id.split(',');
    let roles = role_id.split(',');

    for (let i = 0; i < persons.length; i++) {
        insertions.push(`(${caucus_id}, ${persons[i]}, ${roles[i]})`);
    }

    const query = `INSERT INTO parliament.caucus_member(caucus_id, person_id, role_id) VALUES ${insertions.join(',')};`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        })
        .catch((e) => {
            throw new Error(e);
        });
};
