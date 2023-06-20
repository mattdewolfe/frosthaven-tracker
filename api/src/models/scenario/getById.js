import { oneOrNoneQuery } from '../helpers';
import Scenario from './Scenario';

export default async ({ id } = {}, client) => {

    if (!id) {
        throw new Error("Scenario request missing Id");
    }

    const query = `SELECT * FROM tracker.scenario WHERE id =${id};`;

    return oneOrNoneQuery(client, query)
<<<<<<< HEAD
        .then((record) => {
            if (record) {
                return Scenario.constructFromObject(record);
            }

            return null;
=======
        .then((records) => {
            /* eslint-disable-next-line no-param-reassign */
            return Array.from(records.items)
                .map((item) => Scenario.constructFromObject(item));
>>>>>>> dev
        });
};
