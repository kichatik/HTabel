const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Appointment = sequelize.define('Appointment', {
    appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Kuupäev on kohustuslik'
            }
        }
    },

    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Aeg on kohustuslik'
            }
        }
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'bookitud',
        validate: {
            isIn: {
                args: [['bookitud', 'tühistatud', 'ootel']],
                msg: 'Vale staatuse väärtus'
            }
        }
    },

    patient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    timestamps: true
});

module.exports = Appointment;