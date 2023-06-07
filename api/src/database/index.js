import pgPromiseLib from 'pg-promise';

const pgPromise = pgPromiseLib();

pgPromise.pg.types.setTypeParser(20, parseInt);
pgPromise.pg.types.setTypeParser(1700, parseFloat);

/**
 * Instantiate a database instance
 */
let db = null;


export function getDb() {

    if (db) {
        return db;
    }

    db = pgPromise({
        host: "localhost",
        port: "5432",
        database: "tracker",
        user: "master",
        password: "password",
        // host: process.env.DB_HOST || "localhost",
        // port: process.env.DB_PORT || "5432",
        // database: process.env.DB_NAME || "tracker",
        // user: process.env.DB_USER || "master",
        // password: process.env.DB_PASSWORD || "password",
    });

    console.log(db);

    return db;
}

export const postgres = {
    getDb,
    pgPromise,
};
