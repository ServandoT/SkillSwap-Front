import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import Clase from './Clase';
import '../styles/Main.css';

function Main() {
  const URL_API = import.meta.env.VITE_URL_API;
  const [clases, setClases] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get(`${URL_API}/clases`, {
      headers: {
        Authorization: '',
      }
    })
      .then((res) => {
        setClases(res.data);
      })
      .catch((error) => {
        console.error('Error cargando las clases:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${URL_API}/categorias`, {
      headers: {
        Authorization: '',
      }
    })
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((error) => {
        console.error('Error cargando las categorias:', error);
      });
  }, []);

  return (
    <main>

      <div className="cabecera">
        <h1>Nuestras Clases</h1>
        <div className="filtros">
          <form>
            <select>
              <option value="">Selecciona una categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>

      <div className="clases">
        {clases.map(clase => (
          <Clase clase={clase} />
        ))}
      </div>
    </main>
  );
}

export default Main;