const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {

    host: 'localhost',

    dialect: 'mysql',

    port: 3306

});

module.exports = sequelize;