import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/ValidarJWT";
import Swal from "sweetalert2";
import Clase from "./Clase";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import '../styles/Perfil.css';


const Perfil = () => {

    const URL_API = import.meta.env.VITE_URL_API;

    if (isAuthenticated() === false) {
        localStorage.removeItem('skillswapToken');
        window.location.href = '/';
    }

    const [misClases, setMisClases] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        axios.get(`${URL_API}/clases/propias`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('skillswapToken')}`
            }
        })
            .then((res) => {
                setMisClases(res.data);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar tus clases. Inténtalo más tarde.'
                });
            });
    }, []);

    return (
        <>
        <Header />
        <div className='perfil'>

            <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>Publicar una clase</button>

            {mostrarFormulario && (
                <div className='formulario-clase-modal-container'>
                    <h2>Publicar una nueva clase</h2>
                    <form className="formulario-nueva-clase">
                        <h2>Publica una nueva clase</h2>
                        <label>
                            Título:
                            <input type="text" required />
                        </label>
                        <label>
                            Descripción:
                            <textarea required></textarea>
                        </label>
                        <button type="submit">Publicar</button>
                    </form>
                    <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>Cancelar</button>
                </div>
            )}


            <h2>Mis clases</h2>

            <div className='mis-clases'>
                {misClases.length > 0 ? (
                    misClases.map((clase) => (
                        <Clase key={clase.id} clase={clase} />
                    ))
                ) : (
                    <p>¡Publica una clase propia ya!</p>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Perfil;