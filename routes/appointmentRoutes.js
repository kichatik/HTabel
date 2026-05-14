module.exports = app => {
    const appointmentController = require('../controllers/appointmentController');
    const router = require('express').Router();

    router.post('/', appointmentController.createAppointment);

    router.get('/', appointmentController.getAppointmentsByDoctorAndDate);

    router.get('/my', appointmentController.getMyAppointments);

    router.put('/cancel/:id', appointmentController.cancelAppointment);

    app.use('/api/appointments', router);
};