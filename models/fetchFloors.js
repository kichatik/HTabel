const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const fetchFloors = sequelize.define('fetchFloor', {  // Используем 'fetchFloor', а не 'Floor'
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    floorNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "Номер этажа должен быть целым числом." // Сообщение об ошибке
            },
        }
    },
    floorName: { 
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false, // Отключение автоматического добавления временных меток
});

module.exports = fetchFloors;
