const pgPromise = require("pg-promise");
    const config = {

    host : 'localhost',
	port : '5432',
	database: 'ingresosEgresos_db',
	user:'postgres',
	password: '**************'
    };

const pgp = pgPromise({});
const db = pgp(config);

exports.db = db;
