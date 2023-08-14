import style from "./FiltersBar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { order_dogs, get_temperaments, filter_origin, filter_temp } from "../../redux/actions";
import { useEffect } from "react";

const FiltersBar = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(get_temperaments())
    },[dispatch])
    
    const handleOrigin = (event) => {
        dispatch(filter_origin(event.target.value))
    };

    const handleFilterTemperament=(event)=>{
        dispatch(filter_temp(event.target.value))
    };

    const handleOrder=(event)=>{
        dispatch(order_dogs(event.target.value))
    };
    
    const temperaments= useSelector(state=>state.temperaments);
    return (
        <div className={style.container}>
            <select className={style.select} onChange={handleOrigin}>
                <option value="AllDogs">All dogs</option>
                <option value="ApiDogs">API dogs</option>
                <option value="DbDogs">DB dogs</option>
            </select>
            <select className={style.select} onChange={handleFilterTemperament}>
                <option value="">Temperaments</option>       
                {temperaments.map((temp, index)=>(
                    <option key={index} value={temp}>
                        {temp}
                    </option>
                ))}
            </select>
            <select className={style.select} onChange={handleOrder}>
                <option value="OrderAsc">Order by Name A-Z</option>
                <option value="OrderDesc">Order by Name Z-A</option>
                <option value="OrderByWeightAsc">Order by Weight Asc</option>
                <option value="OrderByWeightDesc">Order by Weight Desc</option>
            </select>
            
        </div>
    )
}

export default FiltersBar