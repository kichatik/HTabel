module.exports = app => {
    const users = require('../controllers/userController');
    const router = require('express').Router();

    router.post('/setup-first-user', users.createFirstUser);

    router.post('/login', users.login);

    router.post('/logout', users.logout);

    // Кто сейчас вошёл
    router.get('/me', users.me);

    router.get('/', users.findAll);

    router.post('/admin/users', users.createUserByAdmin);

    app.use('/api/users', router);
};