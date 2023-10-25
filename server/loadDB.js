const axios = require('axios');
const { Country } = require('./src/db');

const loadDB = async () => {
    const DBCountries = await Country.findAll();

    if (!DBCountries.length) {
        try {
            const data = require('./api/db.json');
            for (let i = 0; i < data.length; i++) {
                await Country.findOrCreate({
                    where: { name: data[i].name },
                    defaults: data[i],
                });
            }
            console.log("Los datos se han cargado exitosamente desde db.json");
        } catch (error) {
            console.error("Error al cargar datos desde db.json:", error);
        }
    } else {
        console.log("La base de datos ya contiene datos. No se requiere carga.");
    }
};

module.exports = loadDB;

