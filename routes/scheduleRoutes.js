module.exports = app => {
    const router = require('express').Router();

    const Employee = require('../models/Employee');
    const Appointment = require('../models/Appointment');

    const times = [
        "09:00","09:30","10:00","10:30","11:00","11:30",
        "12:00","12:30","13:00","13:30","14:00","14:30",
        "15:00","15:30","16:00"
    ];

    router.get('/', async (req, res) => {
        try {
            const date = req.query.date;

            if (!date) {
                return res.status(400).json({ error: "date is required" });
            }

            const employees = await Employee.findAll();

            const appointments = await Appointment.findAll({
                where: { appointment_date: date }
            });

            const appointmentMap = new Map();

            for (const a of appointments) {
                const key = `${a.employee_id}_${a.appointment_time.slice(0,5)}`;
                appointmentMap.set(key, true);
            }

            const result = employees.map(emp => {

                const slots = times.map(t => {
                    const key = `${emp.id}_${t}`;
                    const busy = appointmentMap.has(key);

                    return {
                        time: t,
                        status: busy ? "busy" : "free"
                    };
                });

                return {
                    employee: emp,
                    slots
                };
            });

            res.json(result);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Schedule error" });
        }
    });

    app.use('/api/schedule', router);
};