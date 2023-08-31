import { oneOrNoneQuery } from '../helpers';

export default async ({ id } = {}, client) => {

    if (!id) {
        throw new Error('Scenario Id must be provided to delete Status Received by Scenario');
    }

    const idQuery = `DELETE FROM tracker.status_received WHERE scenario_id=${id};`;

    return oneOrNoneQuery(client, idQuery)
        .then((res) => {
            return res;
        },
            (e) => {
                throw new Error(e);
            });
};
