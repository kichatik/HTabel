// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/database');

// const FloorGroup = sequelize.define('FloorGroup', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     floorNumber: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//             isInt: {
//                 msg: 'Номер этажа должен быть целым числом.'
//             }
//         }
//     },
//     floorName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// }, {
//     timestamps: false,
// });