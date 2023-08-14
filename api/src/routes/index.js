const { Router } = require('express');
const getDogs = require("../handlers/getDogs");
const getDogById = require("../handlers/getDogById");
const postDog = require("../handlers/postDog");
const getTemperaments = require("../handlers/getTemperaments");

const router = Router();

router.get("/dogs", getDogs); //obtener por nombre o sino traer todo
router.get("/dogs/:idDog", getDogById);
router.post("/dogs", postDog);
router.get("/temperaments", getTemperaments)

module.exports = router;
