const { getById } = require("../controllers/dogs")

const getDogById = async (req, res) => {
    try {
        const { idDog } = req.params;
        const source = isNaN(idDog) ? "db" : "api"; //si el id ingresado es UUID trabajo con DB sino con API
        const dog = await getById(idDog, source);
        return res.status(200).json(dog);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = getDogById;
