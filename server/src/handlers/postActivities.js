const { Activity } = require('../db');

const postActivities = async (req, res) => {
    const { season, name, difficulty, duration, CountryId } = req.body;
    try {
        if (!name || !season || !difficulty || !duration || !CountryId) {
            return res.status(404).json({ error: "missing data" })
        }
        const activity = await Activity.create({ name, difficulty, duration, season });

        await activity.setCountries(CountryId);
        res.status(200).json({ message: "tourist activity created successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = postActivities;