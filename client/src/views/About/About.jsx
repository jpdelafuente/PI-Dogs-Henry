import style from "./About.module.css";

const About = () => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>Sobre el proyecto</h1>
            <p className={style.content}>Este proyecto individual fue realizado utilizando Javascript, React y Redux.
                El backend utiliza Express para montar el servidor y Sequelize para la BD.
            </p>
            <p className={style.content}>El objetivo del proyecto es realizar una Single Page Application (SPA), la cual debe interactuar con una api externa. Desde esta api externa se extraerán todos los datos de perros contenidos en ella, para si poder renderizarlos en tarjetas en el home. <br />
                Dentro del Home, se pueden aplicar filtros por temperamento, se puede buscar una raza, donde se buscarán todas las razas que coincidan con el texto que se está ingresando; y tambien se podrán ordenar las tarjetas por nombre de forma ascendente y descendente, asi como por peso ascendente y descendente <br/>
                Además, al dar clic en una tarjeta, se debe deplegar una pagina con detalles completos de la raza. <br />
                Finalmente se pueden crear razas utilizando un formulario, en el cual se validan los datos ingresados conforme se vaya escribiendo.
            </p>
        </div>
    )
}

export default About;