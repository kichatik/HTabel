const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Ühendus andmebaasiga õnnestus');
    } catch (err) {
        console.error('Viga andmebaasiga ühendamisel:', err);
    }
}

module.exports = { sequelize, connectDB };