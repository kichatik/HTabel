module.exports = app => {
    const floorController = require('../controllers/floorController');
    const router = require('express').Router();

    router.post('/', floorController.create);

    router.get('/', floorController.findAll);

    router.put('/:id', floorController.update);
    
    router.delete('/:id', floorController.delete);

    app.use('/api/floors', router);
};