const pgPromise = require("pg-promise");
    const config = {

    host : 'localhost',
	port : '5432',
	database: 'ingresosEgresos_db',
	user:'postgres',
	password: 'Darmi1324.'
    };

const pgp = pgPromise({});
const db = pgp(config);

exports.db = db;
