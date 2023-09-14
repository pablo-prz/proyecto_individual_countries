const { Activity, Country } = require('../db');

const getActivities = async (req, res) => {
    try {
        const response = await Activity.findAll({
            include: {
                model: Country,
                attributes: ["name"],
            },
        });

        if (response.length === 0) {
            return res.status(404).json({ error: "there are no existing activities" });
        }
        res.status(200).json(response);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = getActivities;