const { Country, Activity } = require('../db');

const getCountryDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Country.findByPk(id, {
            incluide: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getCountryDetail;