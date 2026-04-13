const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    professionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    workTeam: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    monday: DataTypes.STRING,
    mondayStatus: DataTypes.STRING,

    tuesday: DataTypes.STRING,
    tuesdayStatus: DataTypes.STRING,

    wednesday: DataTypes.STRING,
    wednesdayStatus: DataTypes.STRING,

    thursday: DataTypes.STRING,
    thursdayStatus: DataTypes.STRING,

    friday: DataTypes.STRING,
    fridayStatus: DataTypes.STRING,

    saturday: DataTypes.STRING,
    saturdayStatus: DataTypes.STRING,

    sunday: DataTypes.STRING,
    sundayStatus: DataTypes.STRING
}, {
    timestamps: false
});

module.exports = Employee;