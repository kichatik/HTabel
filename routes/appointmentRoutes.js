module.exports = app => {
    const appointmentController = require('../controllers/appointmentController');
    const router = require('express').Router();

    router.post('/', appointmentController.createAppointment);

    router.get('/', appointmentController.getAppointmentsByDoctorAndDate);

    router.get('/my', appointmentController.getMyAppointments);

    router.delete('/:id', appointmentController.deleteById);

    router.put('/cancel/:id', appointmentController.cancelAppointment);

    router.put('/:id', appointmentController.updateAppointment);

    app.use('/api/appointments', router);
};