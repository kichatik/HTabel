const Profession = require('../models/profession');

// Kõigi erialade saamine
exports.findAll = async (req, res) => {
    try {
        const professions = await Profession.findAll({
            order: [['name', 'ASC']]
        });

        res.json(professions);
    } catch (error) {
        console.error('Viga erialade laadimisel:', error);
        res.status(500).json({ message: 'Viga erialade laadimisel' });
    }
};

// Uue eriala lisamine
exports.create = async (req, res) => {
    let { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ message: 'Eriala nimi on kohustuslik' });
    }

    name = name.trim();

    try {
        const existingProfessions = await Profession.findAll();

        const exists = existingProfessions.some(
            p => p.name.toLowerCase() === name.toLowerCase()
        );

        if (exists) {
            return res.status(409).json({
                message: 'Selline eriala on juba olemas'
            });
        }

        const newProfession = await Profession.create({
            name
        });

        res.status(201).json(newProfession);
    } catch (error) {
        console.error('Viga eriala loomisel:', error);
        res.status(500).json({ message: 'Viga eriala loomisel' });
    }
};