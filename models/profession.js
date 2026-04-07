const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profession = sequelize.define('Profession', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

module.exports = Profession;
