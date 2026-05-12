// const FetchFloors = require('../models/floorGroup');

// // Получение всех этажей
// exports.getAllFloors = async (req, res) => {
//     try {
//         const floors = await FetchFloors.findAll({
//             order: [['floorNumber', 'ASC']]
//         });
//         res.json(floors);
//     } catch (error) {
//         console.error('Ошибка при получении этажей:', error);
//         res.status(500).json({ error: 'Ошибка при получении этажей' });
//     }
// };

// // Добавление нового этажа
// exports.addFloor = async (req, res) => {
//     const { floorNumber, floorName } = req.body;

//     if (floorNumber == null || !floorName) {
//         return res.status(400).json({
//             success: false,
//             message: 'Номер этажа и название обязательны'
//         });
//     }

//     const parsedFloorNumber = Number(floorNumber);
//     if (Number.isNaN(parsedFloorNumber)) {
//         return res.status(400).json({
//             success: false,
//             message: 'Номер этажа должен быть числом'
//         });
//     }

//     try {
//         const newFloor = await FetchFloors.create({
//             floorNumber: parsedFloorNumber,
//             floorName
//         });

//         res.status(201).json({
//             success: true,
//             floor: newFloor
//         });
//     } catch (error) {
//         console.error('Ошибка при добавлении этажа:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Ошибка при добавлении этажа'
//         });
//     }
// };

// // Объединение этажей
// exports.combineFloors = async (req, res) => {
//     const { selectedFloors, combinedFloorName } = req.body;

//     if (!Array.isArray(selectedFloors) || selectedFloors.length < 2 || !combinedFloorName) {
//         return res.status(400).json({
//             success: false,
//             message: 'Необходимо выбрать хотя бы два этажа и указать название нового этажа.'
//         });
//     }

//     try {
//         const validFloors = selectedFloors.map((floorId) => {
//             const floor = parseInt(floorId, 10);
//             if (Number.isNaN(floor)) {
//                 throw new Error(`Номер этажа ${floorId} должен быть целым числом.`);
//             }
//             return floor;
//         });

//         const combinedFloor = await FetchFloors.create({
//             floorName: combinedFloorName,
//             floorNumber: Math.min(...validFloors),
//             floors: validFloors
//         });

//         res.status(201).json({
//             success: true,
//             message: 'Этажи успешно объединены.',
//             combinedFloor
//         });
//     } catch (error) {
//         console.error('Ошибка при объединении этажей:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Произошла ошибка при объединении этажей.'
//         });
//     }
// };

// // Обновление этажа по id
// exports.update = async (req, res) => {
//     const { id } = req.params;
//     const { floorNumber, floorName } = req.body;

//     if (floorNumber == null && !floorName) {
//         return res.status(400).json({
//             success: false,
//             message: 'Укажите номер этажа или его название для обновления'
//         });
//     }

//     try {
//         const floorToUpdate = await FetchFloors.findByPk(id);

//         if (!floorToUpdate) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Этаж не найден'
//             });
//         }

//         if (floorNumber != null) {
//             const parsedFloorNumber = Number(floorNumber);
//             if (Number.isNaN(parsedFloorNumber)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Номер этажа должен быть числом'
//                 });
//             }
//             floorToUpdate.floorNumber = parsedFloorNumber;
//         }

//         if (floorName) {
//             floorToUpdate.floorName = floorName;
//         }

//         await floorToUpdate.save();

//         res.json({
//             success: true,
//             floor: floorToUpdate
//         });
//     } catch (error) {
//         console.error('Ошибка при обновлении этажа:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Ошибка при обновлении этажа'
//         });
//     }
// };

// // Удаление этажа по id
// exports.delete = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const floorToDelete = await FetchFloors.findByPk(id);

//         if (!floorToDelete) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Этаж не найден'
//             });
//         }

//         await floorToDelete.destroy();

//         res.json({
//             success: true,
//             message: 'Этаж удален'
//         });
//     } catch (error) {
//         console.error('Ошибка при удалении этажа:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Ошибка при удалении этажа'
//         });
//     }
// };