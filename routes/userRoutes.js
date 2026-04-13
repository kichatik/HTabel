module.exports = app => {
    const userController = require('../controllers/userController');
    const router = require('express').Router();

    // Auth
    router.post('/setup-first-user', userController.createFirstUser);

    router.post('/login', userController.login);

    router.post('/logout', userController.logout);
    
    router.get('/me', userController.me);

    // Admin
    router.post('/admin/users', userController.createUserByAdmin);

    // Users list
    router.get('/', userController.findAll);

    app.use('/api/users', router);
};