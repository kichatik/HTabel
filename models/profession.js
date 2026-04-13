const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Profession = sequelize.define('Profession', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Eriala nimi on kohustuslik'
            }
        }
    }
}, {
    timestamps: false
});

module.exports = Profession;