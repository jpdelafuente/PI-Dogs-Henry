const formatDogApi = (arrDogs) =>
    arrDogs.map((dog) => {
        //creo un atributo de peso maximo para usar como ORDER en el FRONT
            const matches = dog.weight.metric.match(/(\d+)\s*(?:-\s*(\d+)\s*)?(?:kg)?/);
            let maxWeight = 0;
            if (matches) maxWeight = parseInt(matches[2] || matches[1]);
            
        return {
            id: dog.id,
            name: dog.name,
            height: `${dog.height.metric} cm`,
            weight: `${dog.weight.metric} kg`,
            maxWeight: maxWeight,
            life_span: dog.life_span,
            image: dog.image.url,
            temperament: dog.temperament,
            created: false
        }
    });

module.exports = formatDogApi 