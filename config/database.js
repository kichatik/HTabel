const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('haigla_db', 'root', '', { 
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
