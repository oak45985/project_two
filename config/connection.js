const Sequelize = require('sequelize');

require('dotenv').config();


const sequelize = process.env.JAWSDB_URL;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3307
    });
}

module.exports = sequelize;