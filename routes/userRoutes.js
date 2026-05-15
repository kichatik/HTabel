module.exports = app => {
    const userController = require('../controllers/userController');
    const router = require('express').Router();

    // Auth
    router.post('/setup-first-user', userController.createFirstUser);

    router.post('/login', userController.login);

    router.post('/logout', userController.logout);
    
    router.get('/me', userController.me);

    router.post('/register', userController.register);

    router.post('/forgot-password', userController.forgotPassword);
    
    router.post('/reset-password', userController.resetPassword);
    // Admin
    router.post('/admin/users', userController.createUserByAdmin);

    // Users list
    router.get('/', userController.findAll);

    app.use('/api/users', router);
};