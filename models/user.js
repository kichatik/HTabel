const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Имя пользователя обязательно'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Пароль обязателен'
            },
            len: {
                args: [6, 100],
                msg: 'Пароль должен содержать минимум 6 символов'
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // по умолчанию обычный пользователь
    }

}, {
    timestamps: false,
    hooks: {
        beforeValidate: (user) => {
            if (user.username) {
                user.username = user.username.trim();
            }
        },
        beforeCreate: async (user) => {
           if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }

            // 👇 если это первый пользователь — делаем его админом
            const userCount = await User.count();
            if (userCount === 0) {
                user.role = 'admin';
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

module.exports = User;