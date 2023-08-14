const axios = require("axios");
const { Temperament } = require('../db');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const loadTemperaments = async () => {

    if (await Temperament.count() == 0) {//si no hay registros en la tabla, los cargo desde la API
        const apiData = (await axios.get(URL)).data;
        let temperamentsRaw = apiData.map(dog => dog.temperament ? dog.temperament
            : "No info").map(dog => dog?.split(', '));

        let allTemperaments = [...new Set(temperamentsRaw.flat())];//quedarme solo con temperamentos no repetidos de la data cruda
        allTemperaments.sort() //ordeno alfabeticamente antes de cargarlos en la DB

        allTemperaments.forEach(temp => {
            if (temp) Temperament.findOrCreate({ where: { name: temp } }) //recorro cada temperamento y lo voy metiendo en la db si es que no existe
        });
    }

    const arrTemperaments = await Temperament.findAll(); //retorno todos los temperamentos que ya quedaron cargados en la DB
    return arrTemperaments.map(temp => temp.name);

};
module.exports = loadTemperaments
