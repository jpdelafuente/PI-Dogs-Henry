import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { get_dogs } from "../../redux/actions";

const Home= ()=>{
    const dispatch= useDispatch();
    
    useEffect(()=>{  
            dispatch(get_dogs())
    },[])
    
    return(
        <>
            <CardsContainer/>
        </>
    )
};

export default Home;