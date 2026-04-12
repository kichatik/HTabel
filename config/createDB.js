const sequelize = require("../config/database");
require('../models/employee');
require('../models/floor');
require('../models/user');
require('../models/floorGroup');
require('../models/profession');

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('База данных синхронизирована успешно.');
    } catch (error) {
        console.error('Ошибка при синхронизации базы данных:', error);
    }
}

syncDatabase();
