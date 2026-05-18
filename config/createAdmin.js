const { sequelize } = require('./database');
const User = require('../models/User');

// Synchronize database and create initial admin user if database is empty
async function createAdmin() {
    try {
        await sequelize.sync();

        const admin = await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin'
        });

        console.log('Admin created:', admin.username);
    } catch (error) {
        console.error('Error creating admin:', error.message);
    } finally {
        await sequelize.close();
    }
}

createAdmin();