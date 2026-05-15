const { Appointment, Employee } = require('../models');
const { Op } = require('sequelize');

exports.createAppointment = async (req, res) => {
    try {
        const userId = req.session.user.id;

        const {
            employee_id,
            appointment_date,
            appointment_time,
            patient_name
        } = req.body;

        if (!employee_id || !appointment_date || !appointment_time) {
            return res.status(400).json({
                message: 'Puuduvad andmed (arst, kuupäev või aeg)'
            });
        }

        const now = new Date();

        const selected = new Date(`${appointment_date}T${appointment_time}`);

        if (selected <= now) {
            return res.status(400).json({
                message: 'Minevikku ei saa broneerida'
            });
        }

        const existing = await Appointment.findOne({
            where: {
                employee_id,
                appointment_date,
                appointment_time,
                status: 'bookitud'
            }
        });

        if (existing) {
            return res.status(400).json({
                message: 'See aeg on juba broneeritud'
            });
        }

        const appointment = await Appointment.create({
            user_id: userId,
            employee_id,
            appointment_date,
            appointment_time,
            patient_name,
            status: 'bookitud'
        });

        return res.status(201).json({
            message: 'Broneering loodud edukalt',
            appointment
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Serveri viga' });
    }
};

exports.getAppointmentsByDoctorAndDate = async (req, res) => {
    try {
        const { employee_id, date } = req.query;

        if (!employee_id || !date) {
            return res.status(400).json({
                message: 'Puudub employee_id või date'
            });
        }

        const appointments = await Appointment.findAll({
            where: {
                employee_id,
                appointment_date: date,
                status: 'bookitud'
            }
        });

        return res.json(appointments);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Serveri viga'
        });
    }
};

exports.getMyAppointments = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Not logged in' });
        }

        const userId = req.session.user.id;

        const appointments = await Appointment.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Employee,
                    as: 'employee'
                }
            ],
            order: [
                ['appointment_date', 'ASC'],
                ['appointment_time', 'ASC']
            ]
        });

        return res.json(appointments);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const appointmentId = req.params.id;
        const {
            employee_id,
            appointment_date,
            appointment_time,
            patient_name
        } = req.body;

        if (!employee_id || !appointment_date || !appointment_time) {
            return res.status(400).json({
                message: 'Puuduvad andmed (arst, kuupäev või aeg)'
            });
        }

        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Broneeringut ei leitud' });
        }

        if (
            appointment.user_id !== userId &&
            req.session.user.role !== 'admin'
        ) {
            return res.status(403).json({ message: 'Sul pole õigust seda broneeringut muuta' });
        }

        if (appointment.status !== 'bookitud') {
            return res.status(400).json({ message: 'Ainult aktiivseid broneeringuid saab muuta' });
        }

        const now = new Date();
        const selected = new Date(`${appointment_date}T${appointment_time}`);

        if (selected <= now) {
            return res.status(400).json({
                message: 'Minevikku ei saa broneerida'
            });
        }

        const existing = await Appointment.findOne({
            where: {
                employee_id,
                appointment_date,
                appointment_time,
                status: 'bookitud',
                id: { [Op.ne]: appointmentId }
            }
        });

        if (existing) {
            return res.status(400).json({
                message: 'See aeg on juba broneeritud'
            });
        }

        appointment.employee_id = employee_id;
        appointment.appointment_date = appointment_date;
        appointment.appointment_time = appointment_time;
        appointment.patient_name = patient_name || appointment.patient_name;

        await appointment.save();

        return res.json({
            message: 'Broneering uuendatud edukalt',
            appointment
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const userId = req.session.user.id; // или req.user.id если JWT
        const appointmentId = req.params.id;

        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Broneeringut ei leitud' });
        }

        // ❗ главное правило безопасности
        if (appointment.user_id !== userId) {
            return res.status(403).json({
                message: 'Sul pole õigust seda broneeringut kustutada'
            });
        }

        await appointment.destroy();

        res.json({ message: 'Broneering kustutatud' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({
                message: 'Broneeringut ei leitud'
            });
        }

        if (
            appointment.user_id !== req.session.user.id &&
            req.session.user.role !== 'admin'
        ) {
            return res.status(403).json({
                message: 'Ligipääs keelatud'
            });
        }

        appointment.status = 'tühistatud';
        await appointment.save();

        return res.json({ message: 'Broneering tühistatud' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Serveri viga' });
    }
};