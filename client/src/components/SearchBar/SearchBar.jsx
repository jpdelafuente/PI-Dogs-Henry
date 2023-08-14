import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { get_dogs_by_name } from "../../redux/actions";

const SearchBar = () => {
    const [name, setName] = useState("")
    const dispatch= useDispatch()

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const searchByName=()=>{
        const reLetters = /^[a-zA-Z]{2,18}$/; //entre 2 y 18 caracteres solo letras

        (reLetters.test(name)===true)? dispatch(get_dogs_by_name(name))
        : alert("Se deben ingresar solo letras. entre 2 y 18 caracteres")  
    };
    

    return (
        <div className={style.container}>
            <input className={style.input} placeholder="Search by name" maxLength={20} value={name} onChange={handleChange}></input>
            <button className={style.button} onClick={() => { searchByName(name); setName("") }} >SEARCH</button>
        </div>
    )
};

export default SearchBar;