const { Dog, Temperament } = require("../../db");
const axios = require("axios");
const formatDogDb = require("../../utils/formatDogDb");
const formatDogApi = require("../../utils/formatDogApi");
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { Op } = require('sequelize');
const MIN_LONG_NAME = 2;

const createDog = async (name, height, weight, maxWeight, life_span, temperament) => {

    if (!name || !height || !weight || !maxWeight || !life_span || !temperament) throw Error("missing data")
    const image = (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message; //obtengo img random (consultar)
    const newDog = await Dog.create({ name, height, weight, maxWeight, life_span, image })

    temperament = [...new Set(temperament)];// en caso de que me llegaran temperamentos repetidos
    temperament.map(async (temp) => {
        const eachTemperament = await Temperament.findOne({ where: { name: temp } })
        await newDog.addTemperament(eachTemperament);
    })
    return newDog
};

module.exports = { createDog };