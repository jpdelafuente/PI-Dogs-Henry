import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { get_dog_by_id, clean_detail } from "../../redux/actions";
import style from "./Detail.module.css";


const Detail = () => {
    const { detailId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clean_detail())//Limpiar el componente antes de montarlo
        dispatch(get_dog_by_id(detailId))
    }, [detailId])

    const dog = useSelector(state => state.dog); 
    const handleBack=()=>{
        navigate(-1)
    };
    return (
        <div>
            <div className={style.container}>
                <div className={style.containerInfo}>
                    <h1 className={style.info}>DETAILS</h1>
                    <h2 className={style.info}>BREED: {dog.name}</h2>
                    <h2 className={style.info}>HEIGHT: {dog.height}</h2>
                    <h2 className={style.info}>WEIGHT: {dog.weight}</h2>
                    <h2 className={style.info}>LIFE SPAN: {dog.life_span}</h2>
                    <h2 className={style.info}>TEMPERAMENT: {dog.temperament}</h2>
                </div>
                <div>
                    <img className={style.image} src={dog.image} alt='' />
                </div>
            </div>
            <div>
                <button className={style.button} onClick={handleBack}>back</button>
            </div>
        </div>
    )
};

export default Detail;