const Floor = require('../models/floor');

exports.create = async (req, res) => {
    try {
        let { floorNumber, floorName } = req.body;

        if (floorNumber == null || !floorName) {
            return res.status(400).json({
                message: 'Korruse number ja nimi on kohustuslikud'
            });
        }

        const parsedFloorNumber = Number(floorNumber);
        if (Number.isNaN(parsedFloorNumber)) {
            return res.status(400).json({
                message: 'Korruse number peab olema arv'
            });
        }

        floorName = floorName.trim();

        const existingFloor = await Floor.findOne({
            where: { floorNumber: parsedFloorNumber, floorName },
        });

        if (existingFloor) {
            return res.status(409).json({
                message: 'Selline korrus juba eksisteerib'
            });
        }

        const newFloor = await Floor.create({
            floorNumber: parsedFloorNumber,
            floorName
        });

        res.status(201).json(newFloor);
    } catch (error) {
        console.error('Viga korruse loomisel:', error);
        res.status(500).json({ message: 'Viga korruse loomisel' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    let { floorNumber, floorName } = req.body;

    try {
        const floor = await Floor.findByPk(id);

        if (!floor) {
            return res.status(404).json({ message: 'Korrust ei leitud' });
        }

        let newFloorNumber = floor.floorNumber;
        let newFloorName = floor.floorName;

        if (floorNumber != null) {
            const parsedFloorNumber = Number(floorNumber);

            if (Number.isNaN(parsedFloorNumber)) {
                return res.status(400).json({
                    message: 'Korruse number peab olema arv'
                });
            }

            newFloorNumber = parsedFloorNumber;
            floor.floorNumber = parsedFloorNumber;
        }

        if (floorName) {
            floorName = floorName.trim();
            newFloorName = floorName;
            floor.floorName = floorName;
        }

        const existingFloor = await Floor.findOne({
            where: {
                floorNumber: newFloorNumber,
                floorName: newFloorName
            }
        });

        if (existingFloor && existingFloor.id !== floor.id) {
            return res.status(409).json({
                message: 'Selline korrus juba eksisteerib'
            });
        }

        await floor.save();
        res.json(floor);
    } catch (error) {
        console.error('Viga korruse uuendamisel:', error);
        res.status(500).json({ message: 'Viga korruse uuendamisel' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const floors = await Floor.findAll({
            order: [['floorNumber', 'ASC']]
        });

        res.json(floors);
    } catch (error) {
        console.error('Viga korruste laadimisel:', error);
        res.status(500).json({ message: 'Viga korruste laadimisel' });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const floor = await Floor.findByPk(id);

        if (!floor) {
            return res.status(404).json({ message: 'Korrust ei leitud' });
        }

        await floor.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Viga korruse kustutamisel:', error);
        res.status(500).json({ message: 'Viga korruse kustutamisel' });
    }
};