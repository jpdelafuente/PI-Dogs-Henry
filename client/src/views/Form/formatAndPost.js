import axios from "axios";
//hago unos ajustes en el formato que voy a enviar la informacion y realizo mi metodo POST

export const formatAndPost = async ({ name, heightMin, heightMax, weightMin, weightMax, lifeMin, lifeMax }, selectedTemp) => { 
    try {
        const newDog = {
            name: name,
            height: `${heightMin} - ${heightMax}`,
            weight: `${weightMin} - ${weightMax}`,
            maxWeight: parseInt(weightMax),
            life_span: `${lifeMin} - ${lifeMax}`,
            temperament: selectedTemp
        }
        const endpoint = `http://localhost:3001/dogs`;
        const response = await axios.post(endpoint, newDog)
        alert(response.data)
    } catch (error) {
        alert(error.response.data.error)
    }
};
