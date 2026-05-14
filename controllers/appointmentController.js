const { Appointment, Employee } = require('../models');

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
                appointment_time
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