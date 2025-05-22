import React, { useEffect } from 'react';
import Clase from './Clase';
import axios from 'axios';
import { FaUndo } from 'react-icons/fa';
import '../styles/ClaseDetalle.css';
import { EmblaCarousel } from './EmblaCarousel';

const ClaseDetalle = ({ clase, clases, onBack }) => {

    const URL_API = import.meta.env.VITE_URL_API;
    // TODO quedarme con este modo de obtener las clases o hacer la llamada otra vez???
    // const [clases, setClases] = React.useState([]);

    // TODO borrar
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

    // TODO primer carrusel
    // const responsive = {
    //     superLargeDesktop: {
    //         // the naming can be any, depends on you.
    //         breakpoint: { max: 4000, min: 3000 },
    //         items: 5
    //     },
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 3
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1
    //     }
    // };

    return (
        <div className='clase-detalle-container'>
            <button className='enlace-volver' onClick={onBack}><FaUndo /> <p>Volver</p></button>

            <Clase clase={clase} className='detalle-clase' />

            <button className='boton-reservar'>Reservar</button>

{/* TODO borrar carrusel anterior */}
            {/* <Carousel responsive={responsive}>
                {clases.map((clase) => (
                    <Clase key={clase.id} clase={clase} />
                ))}
            </Carousel> */}
            <p className='titulo-carrusel'>Otras clases</p>
            <EmblaCarousel clases={clases} />
        </div>
    );
};

export default ClaseDetalle;