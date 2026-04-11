module.exports = app => {
    const users = require('../controllers/userController');
    const router = require('express').Router();

    // Создание нового пользователя
    router.post('/register', users.create);

    // Вход пользователя
    router.post('/login', users.login); // Убедитесь, что путь правильный

    // Получение всех пользователей (опционально, для тестирования)
    router.get('/', users.findAll);

    // Используйте определенные маршруты
    app.use('/api/users', router); // Теперь /api/users/login будет правильным маршрутом для входа
};
