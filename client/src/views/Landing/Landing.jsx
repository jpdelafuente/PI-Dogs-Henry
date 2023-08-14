import { useNavigate } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate("/home");
    }
    return (
        <div className={style.container}>
            <p className={style.title} >Bienvenido a Dogs App</p>

            <button className={style.button} onClick={login}>Ingresar</button>
        </div>
    )
};

export default Landing;