const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    WorkTeam: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monday: {
        type: DataTypes.STRING
    },
    tuesday: {
        type: DataTypes.STRING
    },
    wednesday: {
        type: DataTypes.STRING
    },
    thursday: {
        type: DataTypes.STRING
    },
    friday: {
        type: DataTypes.STRING
    },
    saturday: {
        type: DataTypes.STRING
    },
    sunday: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false
});

module.exports = Employee;
