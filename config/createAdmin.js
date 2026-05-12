const { sequelize } = require('./database');
const User = require('../models/User');

async function createAdmin() {
    try {
        await sequelize.sync();

        const admin = await User.create({
            username: 'admin',
            password: 'admin123',
            role: 'admin'
        });

        console.log('Админ создан:', admin.username);
    } catch (error) {
        console.error('Ошибка создания админа:', error.message);
    } finally {
        await sequelize.close();
    }
}

createAdmin();