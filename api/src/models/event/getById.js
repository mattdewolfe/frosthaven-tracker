import Event from './Event';

export default async ({ id } = {}, client) => {

    const query = `SELECT * FROM tracker.event WHERE id = ${id};`;

    return oneOrNoneQuery(client, singleQuery)
        .then((record) => {
            if (record) {
                return Event.constructFromObject(record);
            }

            return null;
        });
};
