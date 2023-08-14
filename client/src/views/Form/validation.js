const reName = /^(?!.*\s{2})[a-zA-Z\s]{2,18}$/; //nombre entre 2 y 18 caracteres de solo letras y no mas de 1 espacio consecutivo
const reNums = /^\d{1,2}$/; //solo permite el ingreso de numeros

const validation = ({ name, heightMin, heightMax, weightMin, weightMax, lifeMin, lifeMax }) => {
    const errors = {}
    if (!reName.test(name)) errors.name = "ingrese un nombre valido"

    if (!reNums.test(heightMin) || !reNums.test(heightMax) || !reNums.test(weightMin) || !reNums.test(weightMax) || !reNums.test(lifeMin) || !reNums.test(lifeMax)) {
        errors.metrics = "solo ingresar numeros | no dejar campos vacios"
    }

    if (parseInt(heightMin) > parseInt(heightMax) || (heightMin.length > 0 & heightMax === "")) errors.height = "Height min no puede ser mayor a Height max";
    if (parseInt(weightMin) > parseInt(weightMax) || (weightMin.length > 0 & weightMax === "")) errors.weight = "Weight min no puede ser mayor a Weight max";
    if (parseInt(lifeMin) > parseInt(lifeMax) || (lifeMin.length > 0 & lifeMax === "")) errors.life_span = "Life Max min no puede ser mayor a Life Max";

    return errors;
};

export default validation;