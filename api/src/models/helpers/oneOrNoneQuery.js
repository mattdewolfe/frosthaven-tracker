export default (connection, query) => {
    return new Promise((resolve, reject) => {
        if (!connection) {
            reject('No Database Connection');
        }

        connection.oneOrNone(query)
            .then((entry) => {
                return resolve(entry);
            })
            .catch((err) => reject(err));
    });
};
