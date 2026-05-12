// module.exports = app => {
//     const floors = require('../controllers/floorGroupController'); // Подключаем контроллер
//     const router = require('express').Router();

//     // Создание нового этажа
//     router.post('/', floors.addFloor); // Здесь добавляем этаж

//     // Получение всех этажей
//     router.get('/', floors.getAllFloors); // Получаем все этажи

//     // Маршрут для объединения этажей
//     router.post('/combine', floors.combineFloors); // Для объединения этажей

//     // Обновление этажа
//     router.put('/:fetchname', floors.update); // Обновление этажа по имени

//     // Удаление этажа
//     router.delete('/:fetchname', floors.delete);

//     // Используем определенные маршруты
//     app.use('/api/floorGroups', router);
// };
