const { sequelize, connectDB } = require('./database');

require('../models/employee');
require('../models/floor');
require('../models/user');
require('../models/profession');
require('../models/appointment');

async function syncDatabase() {
    try {
        await connectDB();

        await sequelize.sync({ alter: true });

        console.log('Andmebaas sünkroniseeriti edukalt.');
    } catch (error) {
        console.error('Viga andmebaasi sünkroniseerimisel:', error);
    }
}

syncDatabase();