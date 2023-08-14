const { getDogByName, getAlldogs } = require("../controllers/dogs");

const getDogs = async (req, res) => { //si tengo query con nombre busco traigo perro por nombre sino traigo todos
    try {
        const { name } = req.query;
        const results = name ? await getDogByName(name) : await getAlldogs()
        return res.status(200).json(results)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = getDogs;
