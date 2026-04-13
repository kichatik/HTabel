require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const floorRoutes = require('./routes/floorRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const professionRoutes = require('./routes/professionRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

userRoutes(app);
floorRoutes(app);
employeeRoutes(app);
professionRoutes(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/login.html');
});

app.use((req, res) => {
    res.status(404).send('Lehte ei leitud');
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server käivitus pordil ${PORT}`);

            import('open').then(open => {
                open.default(`http://localhost:${PORT}/login.html`);
            });
        });
    } catch (error) {
        console.error('Serveri käivitamine ebaõnnestus:', error);
    }
}

startServer();