const { Country } = require('../db');
const { Op } = require('sequelize');

const getCountries = async (req, res) => {
    const { name } = req.query;
    try {
        let response;
        if (name) {
            response = await Country.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                }
            });
        } else {
            response = await Country.findAll();
        }
        if (response.length === 0) {
            return res.status(404).json({ error: error.message });
        } else { return res.status(200).json(response); }

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = getCountries;

