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
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    return db;
}

export const postgres = {
    getDb,
    pgPromise,
};
