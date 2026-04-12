const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profession = sequelize.define('Profession', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Название профессии обязательно'
            }
        }
    }
}, {
    timestamps: false
});

module.exports = Profession;