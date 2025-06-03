import React, { useEffect } from 'react';
import Clase from './Clase';
import axios from 'axios';
import { FaUndo } from 'react-icons/fa';
import '../styles/ClaseDetalle.css';
import { EmblaCarousel } from './EmblaCarousel';
import Swal from 'sweetalert2';
import { isAuthenticated } from '../utils/ValidarJWT';

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

    const enviarValoracion = (puntuacion, idClase) => {
        axios.post(`${URL_API}/valoraciones/${idClase}`, {
            puntuacion: puntuacion
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('skillswapToken')}`
            }
        })
            .then((res) => {
                Swal.fire({
                    title: "Valoración enviada con éxito",
                    text: "Gracias por tu feedback.",
                    icon: "success",
                    draggable: true
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error al enviar la valoración",
                    text: "Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                    draggable: true
                });
            });
    }

    const reservarClase = () => {

        if (isAuthenticated() === false) {
            Swal.fire({
                title: "No has iniciado sesión",
                text: "Por favor, inicia sesión para reservar una clase.",
                icon: "warning",
                draggable: true
            });
            return;
        }

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
            Swal.fire({
                title: "Fecha no válida",
                text: "Por favor, selecciona una fecha dentro de los próximos 14 días.",
                icon: "warning",
                draggable: true
            });
            return;
        }

        // Realizar la reserva
        axios.post(`${URL_API}/reservas`, {
            fecha: fecha,
            idClase: clase.id
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('skillswapToken')}`
            }
        }
        )
            .then((res) => {
                // Swal.fire({
                //     title: "Reserva realizada con éxito",
                //     text: "Enlace a la videollamada: " + res.data,
                //     icon: "success",
                //     draggable: true
                // });

                Swal.fire({
                    title: "Reserva realizada con éxito",
                    html: `
                            <p>Enlace a la videollamada: <a href="${res.data}" target="_blank">${res.data}</a></p>
                            <hr>
                            <label for="rating">Califica tu experiencia (0 a 5):</label><br>
                            <input type="number" id="ratingInput" min="0" max="5" step="1" style="width: 100px; margin-top: 5px;">
                        `,
                    icon: "success",
                    confirmButtonText: "Enviar puntuación",
                    preConfirm: () => {
                        const value = document.getElementById('ratingInput').value;
                        if (value === "" || value < 0 || value > 5) {
                            Swal.showValidationMessage('Por favor ingresa una puntuación entre 0 y 5');
                            return false;
                        }
                        return value;
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const puntuacion = result.value;
                        enviarValoracion(puntuacion, clase.id);
                    }
                });

            })
            .catch((error) => {
                Swal.fire({
                    title: "Error al realizar la reserva",
                    text: "Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                    draggable: true
                });
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

            <p className='titulo-carrusel'>Otras clases</p>
            <EmblaCarousel clases={clases} />
        </div>
    );
};

export default ClaseDetalle;