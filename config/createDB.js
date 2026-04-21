const sequelize = require("../config/database");
require('../models/employee');
require('../models/floor');
require('../models/user');
require('../models/profession');

async function syncDatabase() {
    try {
        await connectDB();
        await sequelize.sync();
        console.log('Andmebaas sünkroniseeriti edukalt.');
    } catch (error) {
        console.error('Viga andmebaasi sünkroniseerimisel:', error);
    }
}

syncDatabase();