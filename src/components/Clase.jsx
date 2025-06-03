import React from 'react';
import '../styles/Clase.css';

const Clase = ({ clase, onClick }) => {
    
    const puntuacion = Array.isArray(clase?.valoraciones) && clase.valoraciones.length > 0
  ? clase.valoraciones.reduce((acc, val) => acc + val.puntuacion, 0) / clase.valoraciones.length
  : 'Sin valoraciones';



    return (
        // TODO falta el precio
        <div className="clase" onClick={onClick}>
            <h1>{clase.titulo}</h1>
            <div className="subtitulo-clase">
                <span>Profesor: {clase.profesor.nombre}</span>
                {/* TODO añadir las categorias */}
                {/* {clase.categorias.map((categoria, index) => (
                    <span key={index} className="categoria">
                        {categoria}
                    </span>
                ))} */}
            </div>
            <p className='descripcion-clase'>{clase.descripcion}</p>
            <p>Duración: {clase.duracion}h</p>
            <p>Coste: {clase.precio} puntos</p>
            {/* TODO poner componente de MUI */}
            <p>Valoración: {puntuacion}</p>
        </div>
    );
};

export default Clase;