import React, { useEffect } from 'react';
import Clase from './Clase';
import axios from 'axios';
import { FaUndo } from 'react-icons/fa';
import '../styles/ClaseDetalle.css';
import { EmblaCarousel } from './EmblaCarousel';

const ClaseDetalle = ({ clase, clases, onBack }) => {

    const URL_API = import.meta.env.VITE_URL_API;
    const [fecha, setFecha] = React.useState(null);

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

    const reservarClase = () => {
        // Comprobar que se ha seleccionado una fecha
        if (!fecha) {
            alert('Por favor, selecciona una fecha para reservar la clase.');
            return;
        }

        // Comprobar que la fecha es válida
        const fechaSeleccionada = new Date(fecha);
        const fechaActual = new Date();
        if (fechaSeleccionada < fechaActual) {
            alert('La fecha seleccionada no es válida. Por favor, selecciona una fecha futura.');
            return;
        }

        // Comprobar que la fecha no sea después de 14 días
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaActual.getDate() + 14);
        if (fechaSeleccionada > fechaLimite) {
            alert('La fecha seleccionada no es válida. Por favor, selecciona una fecha dentro de los próximos 14 días.');
            return;
        }
    
        console.log('fehca' + fecha);
        console.log('clase' + clase.id);
        

        // Realizar la reserva
        axios.post(`${URL_API}/reservas`, {
            fecha: fecha,
            idClase: clase.id
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }
        )
        .then((res) => {
            alert('Reserva realizada con éxito.');
        })
        .catch((error) => {
            alert('Ha ocurrido un error al realizar la reserva. Por favor, inténtalo de nuevo más tarde.');
        });
    }

    return (
        <div className='clase-detalle-container'>
            <button className='enlace-volver' onClick={onBack}><FaUndo /> <p>Volver</p></button>

            <Clase clase={clase} className='detalle-clase' />

            <div className="reservar-container">
                <input type="date" className='boton-reservar' onChange={(e) => setFecha(e.target.value)} />
                <button className='boton-reservar' onClick={() => reservarClase()}>Reservar</button>
            </div>


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