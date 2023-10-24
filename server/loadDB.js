const axios = require('axios');
const { Country } = require('./src/db');

const loadDB = async () => {
    const DBCountries = Country.findAll();
    if (!DBCountries.length) {
        const apiURL = await axios.get('http://localhost:5000/countries');
        const dataApi = await apiURL.data.map((el) => {
            return {
                id: el.cca3,
                name: el.name.official,
                flag: el.flags.png,
                continent: el.continents[0],
                capital: el.capital ? el.capital[0] : "not found",
                subregion: el.subregion ? el.subregion : "not found",
                area: el.area,
                population: el.population,
                map: el.maps.googleMaps ? el.maps.googleMaps : "not found",
            };
        });
        for (let i = 0; i < dataApi.length; i++) {
            await Country.findOrCreate({
                where: { name: dataApi[i].name },
                defaults: dataApi[i],
            });
        }
        console.log("the data has been successfully saved")

    }
};

module.exports = loadDB;



// const { getAllComponentes } = require('../Controllers/componentesController');

// const getComponentesById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const response = await getAllComponentes.findAll({
//             where: {
//                 name: id,
//             }
//         });
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// };
// module.exports = { getComponentesById }