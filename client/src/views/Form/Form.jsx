import style from "./Form.module.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_temperaments } from "../../redux/actions";
import { formatAndPost } from "./formatAndPost";
import validation from "./validation";
import { cleanForm } from "./cleanForm";

const Form = () => {
    //estado global con los temperamentos que tiene mi DB y los traere para mapearlos en mi SELECT options
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_temperaments())
    }, [dispatch])

    //estados locales
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [inputsForm, setInputsForm] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeMin: "",
        lifeMax: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeMin: "",
        lifeMax: ""
    })

    //SELECT OPTIONS
    const handleSelectChange = (event) => {
        const selectedOptions = event.target.value; //opciones del select
        
        const uniqueOptions = new Set(selectedTemperaments); //Set con opciones (sin repetir)
        uniqueOptions.add(selectedOptions); //agrego al Set cada opcion
        
        (Array.from(uniqueOptions).length <= 5) && setSelectedTemperaments(Array.from(uniqueOptions));//valido que se puedan agregar hasta 5
    };
    //INPUTS
    const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setInputsForm({ ...inputsForm, [property]: value })
        setErrors(validation({ ...inputsForm, [property]: value }))
    };
    //BOTON CREATE 
    const handleSubmit = (event) => {
        event.preventDefault();
        //si el objeto errors luego de validation() no tiene errores y al menos seleccione 1 temp. envio el posteo la data del Form
        if((Object.keys(errors).length === 0) & (selectedTemperaments.length!==0)) {
            formatAndPost(inputsForm, selectedTemperaments)
            cleanForm(setInputsForm, setSelectedTemperaments);
        }       
    };

    const temperaments = useSelector(state => state.temperaments)
    return (
        <form className={style.container} onSubmit={handleSubmit} >
            <div className={style.containerByInput}>
                <label className={style.labels}>Name</label>
                <input className={style.inputs} value={inputsForm.name} name="name" maxLength={20} onChange={handleInputChange} />
                <span className={style.errors}>{errors.name}</span>
            </div>
            <div>
                <label className={style.labels}>Height min.</label>
                <input className={style.inputs} value={inputsForm.heightMin} name="heightMin" maxLength={2} type="text" pattern="[0-9]*" onChange={handleInputChange} />
                <label className={style.labels}> max.</label>
                <input className={style.inputs} value={inputsForm.heightMax} name="heightMax" maxLength={2} onChange={handleInputChange} />
            </div>
            <span className={style.errors} >{errors.height}</span>
            <div>
                <label className={style.labels}>Weight min.</label>
                <input className={style.inputs} value={inputsForm.weightMin} name="weightMin" maxLength={2} onChange={handleInputChange} />
                <label className={style.labels}>max.</label>
                <input className={style.inputs} value={inputsForm.weightMax} name="weightMax" maxLength={2} onChange={handleInputChange} />
            </div>
            <span className={style.errors} >{errors.weight}</span>
            <div>
                <label className={style.labels}>Life span min.</label>
                <input className={style.inputs} value={inputsForm.lifeMin} name="lifeMin" maxLength={2} onChange={handleInputChange} />
                <label className={style.labels}>max.</label>
                <input className={style.inputs} value={inputsForm.lifeMax} name="lifeMax" maxLength={2} onChange={handleInputChange} />
            </div>
            <span className={style.errors} >{errors.life_span}</span>
            <span className={style.errors} >{errors.metrics}</span>

            <select className={style.select} multiple value={selectedTemperaments} onChange={handleSelectChange}>
                {temperaments.map((temp, index) => (
                    <option key={index} value={temp}>
                        {temp}
                    </option>
                ))}
            </select>
            <p>SELECTED TEMPERAMENTS: {selectedTemperaments.join(', ')}</p>
            <button className={style.button} type="submit" >CREATE</button>

        </form>
    )
};

export default Form;