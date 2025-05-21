import React, { useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Clase from './Clase';
import axios from 'axios';
import { FaUndo } from 'react-icons/fa';
import '../styles/ClaseDetalle.css';

const ClaseDetalle = ({ clase, clases ,onBack }) => {

    const URL_API = import.meta.env.VITE_URL_API;
    // TODO quedarme con este modo de obtener las clases o hacer la llamada otra vez???
    // const [clases, setClases] = React.useState([]);

    // useEffect(() => {
    //     axios.get(`${URL_API}/clases`,
    //         {
    //             headers: {
    //                 Authorization: '',
    //             }
    //         }
    //     )
    //         .then((res) => {
    //             setClases(res.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error cargando las clases:', error);
    //         });
    // }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='clase-detalle-container'>
            <button onClick={onBack}><FaUndo/>Volver</button>

            <Clase clase={clase} className='detalle-clase'/>

            <Carousel 
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}>
                {clases.map((clase) => (
                    <Clase key={clase.id} clase={clase} />
                ))}
            </Carousel>
        </div>
    );
};

export default ClaseDetalle;