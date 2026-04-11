const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !username.trim() || !password) {
            return res.status(400).json({
                message: 'Kasutajanimi ja parool on kohustuslikud'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Parool peab sisaldama vähemalt 6 tähemärki'
            });
        }

        const existingUser = await User.findOne({
            where: { username: username.trim() }
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Sellise nimega kasutaja on juba olemas'
            });
        }

        const newUser = await User.create({
            username: username.trim(),
            password
        });

        res.status(201).json({
            id: newUser.id,
            username: newUser.username
        });
    } catch (error) {
        console.error('Viga kasutaja loomisel:', error);
        res.status(500).json({
            message: 'Viga kasutaja loomisel'
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !username.trim() || !password) {
        return res.status(400).json({
            message: 'Kasutajanimi ja parool on kohustuslikud'
        });
    }

    try {
        const user = await User.findOne({
            where: { username: username.trim() }
        });

        if (!user) {
            return res.status(401).json({
                message: 'Vale kasutajanimi või parool'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Vale kasutajanimi või parool'
            });
        }

        return res.json({
            message: 'Sisselogimine õnnestus'
        });
    } catch (error) {
        console.error('Viga sisselogimisel:', error);
        return res.status(500).json({
            message: 'Serveri viga'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username'],
            order: [['id', 'ASC']]
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Viga kasutajate hankimisel:', error);
        res.status(500).json({
            message: 'Viga kasutajate hankimisel'
        });
    }
};