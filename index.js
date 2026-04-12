const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
const floorRoutes = require('./routes/floorRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const fetchRoutes = require('./routes/floorGroupRoutes');
const professionRoutes = require('./routes/professionRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'my_secret_key_123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

// API routes
userRoutes(app);
floorRoutes(app);
employeeRoutes(app);
fetchRoutes(app);
professionRoutes(app);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// 404 handler — always last
app.use((req, res) => {
    res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Сервер запущен на порту ${PORT}`);

    const open = (await import('open')).default;
    open(`http://localhost:${PORT}/login.html`);
});