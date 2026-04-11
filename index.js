const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const floorRoutes = require('./routes/floorRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const fetchRoutes = require('./routes/fetchFloorRoutes');
const professionRoutes = require('./routes/professionRoutes');

const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

userRoutes(app);
floorRoutes(app);
employeeRoutes(app);
fetchRoutes(app);
professionRoutes(app);

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Обработчик для корневого маршрута, который будет отдавать login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public')); 
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Сервер запущен на порту ${PORT}`);

     // Динамически импортируем open
     const { default: open } = await import('open');

     // Открытие браузера на странице login.html
     open(`http://localhost:${PORT}/login.html`);
});
