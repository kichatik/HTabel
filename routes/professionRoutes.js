module.exports = app => {
    const professionController = require('../controllers/professionController');
    const router = require('express').Router();

    router.get('/', professionController.findAll);
    
    router.post('/', professionController.create);

    app.use('/api/profession', router);
};