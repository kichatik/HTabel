const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
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
                msg: 'Kasutajanimi on kohustuslik'
            }
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Vale email'
            },
            notEmpty: {
                msg: 'Email on kohustuslik'
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Parool on kohustuslik'
            },
            len: {
                args: [6, 100],
                msg: 'Parool peab sisaldama vähemalt 6 tähemärki'
            }
        }
    },

    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExp: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    timestamps: false,

    hooks: {
        beforeValidate: (user) => {
            if (user.username) {
                user.username = user.username.trim();
            }

            if (user.email) {
                user.email = user.email.trim().toLowerCase();
            }
        },

        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
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