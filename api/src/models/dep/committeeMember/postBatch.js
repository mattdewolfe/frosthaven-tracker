import {noneQuery} from '../helpers';

export default async ({committee_id, person_id, role_id}, client) => {
    if (!committee_id) {
        throw new Error("Committee Id is required to add Members");
    }

    let insertions = [];
    let persons = person_id.split(',');
    let roles = role_id.split(',');

    for (let i = 0; i < persons.length; i++) {
        insertions.push(`(${committee_id}, ${persons[i]}, ${roles[i]})`);
    }

    const query = `INSERT INTO parliament.committee_member(committee_id, person_id, role_id) VALUES ${insertions.join(',')};`;

    return noneQuery(client, query)
        .then((result) => {
            return result;
        })
        .catch((e) => {
            throw new Error(e);
        });
};
