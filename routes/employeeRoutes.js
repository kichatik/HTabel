module.exports = app => {
    const employeeController = require('../controllers/employeeController');
    const router = require('express').Router();

    router.post('/', employeeController.create);

    router.get('/', employeeController.findAll);

    router.put('/:id', employeeController.updateById);
    
    router.delete('/:id', employeeController.deleteById);

    app.use('/employees', router);
};