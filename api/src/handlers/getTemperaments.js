const loadTemperaments = require("../controllers/temperaments")

const getTemperaments = async (req, res) => {
    try {
        const result = await loadTemperaments()
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = getTemperaments;
