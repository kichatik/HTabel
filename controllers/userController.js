const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    try {
        const { username, password } = req.body;

        // пароль хешируется автоматически через hook модели
        const newUser = await User.create({ username, password });

        res.status(201).json({
            id: newUser.id,
            username: newUser.username
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Vale kasutajanimi või parool' });
        }

        // сравнение введённого пароля с хешем из базы
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Vale kasutajanimi või parool' });
        }

        return res.json({ message: 'Sisselogimine õnnestus!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Serveri viga' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username'] // пароль не возвращаем
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};