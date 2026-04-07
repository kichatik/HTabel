const sequelize = require("../config/database");
const Employee = require('../models/employee');
const Room = require('../models/floor');
const User = require('../models/user');
const FetchFlors = require('../models/fetchFloors');
const Profession = require('../models/profession');

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('База данных синхронизирована успешно.');
    } catch (error) {
        console.error('Ошибка при синхронизации базы данных:', error);
    }
}

syncDatabase();
