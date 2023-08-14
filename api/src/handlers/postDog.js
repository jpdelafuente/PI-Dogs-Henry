const { createDog } = require("../controllers/Dogs/CreateDog")

const postDog = async (req, res) => {
    try {
        const { name, height, weight, maxWeight, life_span, temperament } = req.body;
        await createDog(name, height, weight, maxWeight, life_span, temperament)
        return res.status(200).send("dog created successfully");
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = postDog;
