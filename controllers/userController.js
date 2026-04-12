const User = require('../models/user');
const bcrypt = require('bcrypt');

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

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        return res.json({
            message: 'Sisselogimine õnnestus',
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Viga sisselogimisel:', error);
        return res.status(500).json({
            message: 'Serveri viga'
        });
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({
                    message: 'Viga väljalogimisel'
                });
            }

            res.clearCookie('connect.sid');
            return res.json({
                message: 'Väljalogimine õnnestus'
            });
        });
    } catch (error) {
        console.error('Viga väljalogimisel:', error);
        return res.status(500).json({
            message: 'Serveri viga'
        });
    }
};

exports.me = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({
                message: 'Pole sisse logitud'
            });
        }

        return res.json({
            user: req.session.user
        });
    } catch (error) {
        console.error('Viga kasutaja andmete hankimisel:', error);
        return res.status(500).json({
            message: 'Serveri viga'
        });
    }
};

exports.createFirstUser = async (req, res) => {
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

        const userCount = await User.count();

        if (userCount > 0) {
            return res.status(403).json({
                message: 'Esimene kasutaja on juba loodud'
            });
        }

        const newUser = await User.create({
            username: username.trim(),
            password,
            role: 'admin'
        });

        return res.status(201).json({
            message: 'Esimene admin kasutaja loodud',
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Viga esimese kasutaja loomisel:', error);
        return res.status(500).json({
            message: 'Viga kasutaja loomisel'
        });
    }
};

exports.createUserByAdmin = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Ligipääs keelatud'
            });
        }

        const { username, password, role } = req.body;

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

        const safeRole = role === 'admin' ? 'admin' : 'user';

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
            password,
            role: safeRole
        });

        return res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            role: newUser.role
        });
    } catch (error) {
        console.error('Viga kasutaja loomisel:', error);
        return res.status(500).json({
            message: 'Viga kasutaja loomisel'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Ligipääs keelatud'
            });
        }

        const users = await User.findAll({
            attributes: ['id', 'username', 'role'],
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