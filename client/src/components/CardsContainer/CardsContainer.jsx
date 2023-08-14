import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CardsContainer = () => {
    //estado global
    const dogsToRender = useSelector(state => state.dogsToRender);
    //estado local
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1); // Reiniciar currentPage a 1 cuando dogsToRender cambie
    }, [dogsToRender]);

    //Paginado
    const ITEMS_PER_PAGE = 8;
    const indexLastItem = currentPage * ITEMS_PER_PAGE;
    const indexFirstItem = indexLastItem - ITEMS_PER_PAGE;
    const totalPages = Math.ceil(dogsToRender.length / ITEMS_PER_PAGE);

    //items que va a ir mostrando el contenedor de cards
    const currentItems = dogsToRender.slice(indexFirstItem, indexLastItem);

    const handlePrevious = () => {
        (currentPage > 1) && setCurrentPage(currentPage - 1)
    };
    const handleNext = () => {
        (currentPage < totalPages) && setCurrentPage(currentPage + 1)
    };

    return (
        <div >
            <div className={style.container} >
            {currentItems.map(dog => {
                    return <Card
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                        temperament={dog.temperament}
                        weight={dog.weight}
                        image={dog.image}
                    />
                })}   
            </div>
            {(dogsToRender.length > ITEMS_PER_PAGE) ? 
                <div className={style.contPaged}>
                    <label className={style.labelPage}>Page: {currentPage}</label>
                    <button className={style.buttons} onClick={handlePrevious}>PREVIOUS</button>
                    <button className={style.buttons} onClick={handleNext}>NEXT</button>
                </div> : <></>}

        </div>
    )
};

export default CardsContainer;
