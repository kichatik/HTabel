const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Floor = sequelize.define('Floor', {
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
                msg: 'Korruse number peab olema täisarv'
            }
        }
    },
    floorName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Korruse nimi on kohustuslik'
            }
        }
    }
}, {
    timestamps: false,
});

module.exports = Floor;