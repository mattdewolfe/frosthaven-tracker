import { oneOrNoneQuery} from '../helpers';

export default async ({id} = {}, client) => {
    if (!id) {
        throw new Error('Member Id must be provided to delete a Committee Member');
    }

    const idQuery = `DELETE FROM parliament.committee_member WHERE id=${id};`;

    return oneOrNoneQuery(client, idQuery)
        .then((res) => {
                return res;
            },
            (e) => {
                throw new Error(e);
            });
};
