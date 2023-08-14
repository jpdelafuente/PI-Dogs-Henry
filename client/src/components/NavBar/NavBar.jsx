import FiltersBar from "../FiltersBar/FiltersBar";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css"
import { NavLink } from "react-router-dom";

const NavBar = () => {

    return (
        <div className={style.container}>
            <NavLink className={style.links} to="/about">ABOUT</NavLink>
            <NavLink className={style.links} to="/home">HOME</NavLink>
            <NavLink className={style.links} to="/">LOGOUT</NavLink>
            <FiltersBar/>
            <SearchBar/>
            <NavLink className={style.links} to="form">CREATE DOG</NavLink>
        </div>
    )
};

export default NavBar;
