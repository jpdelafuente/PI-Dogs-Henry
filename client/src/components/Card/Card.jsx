import style from "./Card.module.css"
import { NavLink } from "react-router-dom";

const Card = ({ id, image, name, temperament, weight }) => {

    return (
        <NavLink className={style.link} to={`/detail/${id}`}> 
            <div className={style.container}>
                <h2 className={style.info}>{name}</h2>
                <h2 className={style.info}>{weight}</h2>
                <h2 className={style.info}>{temperament}</h2>
                <img className={style.image} src={image} alt={name}></img>
            </div>
        </NavLink>
    )
};

export default Card;
