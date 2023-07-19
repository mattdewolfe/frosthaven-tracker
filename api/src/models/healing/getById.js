import { oneOrNoneQuery } from '../helpers';
import Healing from './Healing';

export default async ({ id } = {}, client) => {

    const query = `SELECT * FROM tracker.healing WHERE id = ${id};`;

    return oneOrNoneQuery(client, singleQuery)
        .then((record) => {
            if (record) {
                return Healing.constructFromObject(record);
            }

            return null;
        });
};
