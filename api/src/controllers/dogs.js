const { Dog, Temperament } = require("../db");
const axios = require("axios");
const formatDogDb = require("../utils/formatDogDb");
const formatDogApi = require("../utils/formatDogApi");
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

const getById = async (idDog, source) => {
    let dogById = [];
    //BUSCO EN LA API
    if (source === "api") {
        let dogData = (await axios.get(`${URL}`)).data
        dogData = dogData.find(dog => dog.id == idDog)
        if (dogData == undefined) throw Error("id not found");

        dogById.push(dogData)
        dogById = formatDogApi(dogById)
        return dogById
    }
    //BUSCO EN LA DB
    let dogData = await Dog.findOne({
        where: { id: idDog }, include: {
            model: Temperament,
            attributes: ['name'],
            through: { attributes: [] },
        }
    })
    dogById.push(dogData)
    dogById = formatDogDb(dogById)
    return dogById
};

const getAlldogs = async () => { //busco dogs en la api y en la base de datos y los junto
    const dbData = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: { attributes: [] },
        }
    });
    const dbDogs = formatDogDb(dbData)

    const apiData = (await axios.get(`${URL}`)).data
    const apiDogs = formatDogApi(apiData)
    return [...dbDogs, ...apiDogs]
};

const getDogByName = async (name) => {
    if (name.length < MIN_LONG_NAME) throw Error("el nombre a buscar deberia tener al menos 2 caracteres")
    //valido que se busque un nombre con al menos dos caracteres
    
    const dbData = await Dog.findAll({
        where: {
            name: { [Op.iLike]: `%${name}%` } //Op.iLike busco tanto minúsculas como mayusculas y % % busco en todo value de name dicho nombre
        },
        include: { //los temperamentos son incluidos en un array de objs
            model: Temperament,
            attributes: ['name'],
            through: { attributes: [] },
        }
    })
    const dbDogs = formatDogDb(dbData);

    const apiData = (await axios.get(`${URL}`)).data
    let apiDogs = formatDogApi(apiData) //aca voy a darle forma a la data de la API
    apiDogs = apiDogs.filter((perro) => perro.name.toLowerCase().includes(name.toLowerCase()))

    return [...dbDogs, ...apiDogs]
};

module.exports = { createDog, getById, getAlldogs, getDogByName }
