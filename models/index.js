const Employee = require('./employee');
const Profession = require('./profession');
const Floor = require('./floor');
const Appointment = require('./appointment');
const User = require('./user'); 

Employee.belongsTo(Profession, { 
    foreignKey: 'professionId', 
    as: 'profession' 
});

Profession.hasMany(Employee, { 
    foreignKey: 'professionId', 
    as: 'employees' 
});

User.hasMany(Appointment, { foreignKey: 'user_id' });
Appointment.belongsTo(User, { foreignKey: 'user_id' });

Employee.hasMany(Appointment, {
    foreignKey: 'employee_id',
    as: 'appointments'
});

Appointment.belongsTo(Employee, {
    foreignKey: 'employee_id',
    as: 'employee'
});

module.exports = { Employee, Profession, Floor, Appointment, User };