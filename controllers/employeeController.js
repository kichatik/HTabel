const Employee = require('../models/employee');

const allowedFields = [
    'firstName',
    'professionId',
    'roomNumber',
    'workTeam',
    'monday',
    'mondayStatus',
    'tuesday',
    'tuesdayStatus',
    'wednesday',
    'wednesdayStatus',
    'thursday',
    'thursdayStatus',
    'friday',
    'fridayStatus',
    'saturday',
    'saturdayStatus',
    'sunday',
    'sundayStatus'
];

function pickFields(obj, fields) {
    const result = {};

    fields.forEach(field => {
        if (obj[field] !== undefined) {
            result[field] = obj[field];
        }
    });

    return result;
}

exports.create = async (req, res) => {
    try {
        const data = pickFields(req.body, allowedFields);

        const newEmployee = await Employee.create(data);

        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            order: [['id', 'ASC']]
        });

        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Töötajat ei leitud' });
        }

        const data = pickFields(req.body, allowedFields);

        await employee.update(data);

        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Töötajat ei leitud' });
        }

        await employee.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};