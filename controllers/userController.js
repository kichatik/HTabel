const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transporter = require('../utils/mailer');

// Validate that username, email, and password meet minimum requirements
function validateRequiredCredentials(username, email, password) {
    if (!username || !username.trim() || !email || !password) {
        return 'Kasutajanimi, email ja parool on kohustuslikud';
    }

    if (password.length < 6) {
        return 'Parool peab sisaldama vähemalt 6 tähemärki';
    }

    return null;
}

// Check if user session has admin role
function isAdmin(sessionUser) {
    return Boolean(sessionUser && sessionUser.role === 'admin');
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const loginValue = username?.trim().toLowerCase();

    if (!loginValue || !password) {
        return res.status(400).json({
            message: 'Kasutajanimi/email ja parool on kohustuslikud'
        });
    }

    try {
        const user = await User.findOne({
            where: {
                [require('sequelize').Op.or]: [
                    { username: loginValue },
                    { email: loginValue }
                ]
            }
        });

        if (!user) {
            return res.status(401).json({
                message: 'Vale kasutajanimi/email või parool'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Vale kasutajanimi/email või parool'
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        return res.json({
            message: 'Sisselogimine õnnestus',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
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

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Viga väljalogimisel:', err);
            return res.status(500).json({
                message: 'Viga väljalogimisel'
            });
        }

        res.clearCookie('connect.sid');
        return res.json({
            message: 'Väljalogimine õnnestus'
        });
    });
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
        const { username, email, password } = req.body;

        const normalizedUsername = username?.trim();
        const normalizedEmail = email?.trim().toLowerCase();

        const validationError = validateRequiredCredentials(normalizedUsername, normalizedEmail, password);
        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const userCount = await User.count();

        if (userCount > 0) {
            return res.status(403).json({
                message: 'Esimene kasutaja on juba loodud'
            });
        }

        const newUser = await User.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password,
            role: 'admin'
        });

        return res.status(201).json({
            message: 'Esimene admin kasutaja loodud',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
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

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const normalizedUsername = username?.trim();
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedUsername || !normalizedEmail || !password) {
            return res.status(400).json({
                message: 'Kasutajanimi, email ja parool on kohustuslikud'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Parool peab olema vähemalt 6 tähemärki'
            });
        }

        const existing = await User.findOne({
            where: {
                [require('sequelize').Op.or]: [
                    { username: normalizedUsername },
                    { email: normalizedEmail }
                ]
            }
        });

        if (existing) {
            return res.status(409).json({
                message: 'Kasutaja või email on juba olemas'
            });
        }

        const user = await User.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password,
            role: 'user'
        });

        return res.status(201).json({
            message: 'Kasutaja loodud',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: 'Serveri viga'
        });
    }
};

exports.createUserByAdmin = async (req, res) => {
    try {
        if (!isAdmin(req.session.user)) {
            return res.status(403).json({
                message: 'Ligipääs keelatud'
            });
        }

        const { username, email, password, role } = req.body;

        const normalizedUsername = username?.trim();
        const normalizedEmail = email?.trim().toLowerCase();

        const validationError = validateRequiredCredentials(normalizedUsername, normalizedEmail, password);
        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const safeRole = role === 'admin' ? 'admin' : 'user';

        const { Op } = require('sequelize');

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username: normalizedUsername },
                    { email: normalizedEmail }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Kasutajanimi või email on juba olemas'
            });
        }

        const newUser = await User.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password,
            role: safeRole
        });
        return res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        });
    } catch (error) {
        console.error('Viga kasutaja loomisel:', error);
        return res.status(500).json({
            message: 'Viga kasutaja loomisel'
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = crypto.randomBytes(32).toString("hex");

        user.resetToken = token;
        user.resetTokenExp = new Date(Date.now() + 30 * 60 * 1000);
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset password",
            html: `
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;font-family:Arial;">
                <tr>
                    <td align="center">

                        <table width="500" style="background:#ffffff;border-radius:10px;padding:20px;">

                            <!-- LOGO 👇 ВОТ СЮДА -->
                            <tr>
                                <td align="center" style="padding-bottom:20px;">
                                    <img src="https://raw.githubusercontent.com/kichatik/HTabel/master/img/logo.png"
                                        width="80"
                                        style="display:block;margin:0 auto;">
                                </td>
                            </tr>

                            <tr>
                                <td align="center">
                                    <h2>Password Reset</h2>
                                    <p>You requested a password reset</p>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding:20px;">
                                    <a href="http://localhost:3000/reset-password.html?token=${token}"
                                    style="background:#0d6efd;color:white;padding:12px 20px;text-decoration:none;border-radius:8px;">
                                        Reset Password
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="font-size:12px;color:#999;">
                                    If you didn’t request this, ignore this email.
                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>
            </table>
            `
        });

        return res.json({ message: "Email sent" });

    } catch (err) {
        console.error("ERROR:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const user = await User.findOne({
            where: {
                resetToken: token
            }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid token'
            });
        }

        if (user.resetTokenExp < new Date()) {
            return res.status(400).json({
                message: 'Token expired'
            });
        }

        user.password = password;
        user.resetToken = null;
        user.resetTokenExp = null;

        await user.save();

        return res.json({
            message: 'Password updated'
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.findAll = async (req, res) => {
    try {
        if (!isAdmin(req.session.user)) {
            return res.status(403).json({
                message: 'Ligipääs keelatud'
            });
        }

        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role'],
            order: [['id', 'ASC']]
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error('Viga kasutajate hankimisel:', error);
        return res.status(500).json({
            message: 'Viga kasutajate hankimisel'
        });
    }
};