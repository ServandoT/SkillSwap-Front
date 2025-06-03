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
    const [categorias, setCategorias] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [puntos, setPuntos] = useState(0);

    useEffect(() => {
        axios.get(`${URL_API}/usuarios/puntos/pripios`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('skillswapToken')}`
            }
        })
            .then((res) => {
                setPuntos(res.data);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar tus puntos. Inténtalo más tarde.'
                });
            });
    }, []);

    useEffect(() => {
        axios.get(`${URL_API}/reservas/propias`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('skillswapToken')}`
            }
        })
            .then((res) => {
                setReservas(res.data);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar tus reservas. Inténtalo más tarde.'
                });
            });
    }, []);

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

    useEffect(() => {
        axios.get(`${URL_API}/categorias`)
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar las categorías. Inténtalo más tarde.'
                });
            });
    }, []);

    const handlePublicarClase = (e) => {

        e.preventDefault();
        const form = e.target;
        const titulo = form.querySelector('#tituloClase').value;
        const descripcion = form.querySelector('#descripcionClase').value;
        const duracion = form.querySelector('#duracionClase').value;
        const precio = form.querySelector('#precioClase').value;
        const idioma = form.querySelector('#idiomaClase').value;
        const categorias = Array.from(form.querySelector('#categoriasClase').selectedOptions).map(option => option.value);

        if (!titulo || !descripcion || !duracion || !precio || !idioma || categorias.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos.'
            });
            return;
        }

        const nuevaClase = {
            titulo,
            descripcion,
            duracion,
            precio: parseInt(precio),
            idioma,
            categorias: categorias
        };

        alert(JSON.stringify(nuevaClase));

        axios.post(`${URL_API}/clases`, nuevaClase, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('skillswapToken')}`
            }
        })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Clase publicada',
                    text: 'Tu clase ha sido publicada correctamente.'
                });
                setMisClases([...misClases, res.data]);
                setMostrarFormulario(false);
                form.reset();
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo publicar la clase. Inténtalo más tarde.'
                });
            });
    }

    return (
        <>
            <Header />
            <div className='perfil'>

                <div className="contenedor">
                    <p>Mis puntos: {puntos}</p>

                    <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>Publicar una clase</button>

                </div>

                {mostrarFormulario && (
                    <div className='formulario-clase-modal-container'>
                        <h2>Publicar una nueva clase</h2>
                        <form className="formulario-nueva-clase" onSubmit={handlePublicarClase}>
                            <h2>Publica una nueva clase</h2>
                            <label>
                                Título:
                                <input type="text" id="tituloClase" required />
                            </label>
                            <label>
                                Descripción:
                                <textarea id="descripcionClase" required></textarea>
                            </label>
                            <label>
                                Duración:
                                <input type="text" id="duracionClase" pattern="^([0-9]{1,2}):([0-5][0-9])$" placeholder="HH:MM" required />
                            </label>
                            <label>
                                Precio:
                                <input type="number" id="precioClase" min="1" required />
                            </label>
                            <label>
                                Idioma:
                                <select id="idiomaClase" required>
                                    <option value="">Selecciona un idioma</option>
                                    <option value="español">Español</option>
                                    <option value="ingles">Inglés</option>
                                    <option value="frances">Francés</option>
                                    <option value="aleman">Alemán</option>
                                    <option value="italiano">Italiano</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </label>
                            <label>
                                Categoría:
                                <select id="categoriasClase" multiple required>
                                    <option value="">Selecciona una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
                                    ))}
                                </select>
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

                <h2>Mis reservas</h2>
                <div className="mis-reservas">
                    {reservas.length > 0 ? (
                        reservas.map((reserva) =>
                            reserva.clase ? (
                                <Clase key={reserva.id} clase={reserva.clase} />
                            ) : null
                        )
                    ) : (
                        <p>No tienes reservas activas.</p>
                    )}

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Perfil;