import { oneOrNoneQuery } from '../helpers';

export default async ({ id } = {}, client) => {

    if (!id) {
        throw new Error('Id must be provided to delete an Status Applied by Id');
    }

    const idQuery = `DELETE FROM tracker.status_applied WHERE id=${id};`;

    return oneOrNoneQuery(client, idQuery)
        .then((res) => {
            return res;
        },
            (e) => {
                throw new Error(e);
            });
};
