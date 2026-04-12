const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hospital = sequelize.define('Hospital', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    monday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tuesday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    wednesday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    thursday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    friday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    saturday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    oddSunday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    evenSunday: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = Hospital;