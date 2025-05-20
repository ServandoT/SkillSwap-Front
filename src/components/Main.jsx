import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Clase from './Clase';
import ReactPaginate from 'react-paginate';
import '../styles/Main.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Main() {
  const URL_API = import.meta.env.VITE_URL_API;
  const [clases, setClases] = useState([]);
  const [clasesFiltradas, setClasesFiltradas ] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;
  // TODO filtros
  const [ filtroNombre, setFiltroNombre ] = useState('');
  const [ filtroCategoria, setFiltroCategoria ] = useState('');


  useEffect(() => {
    axios.get(`${URL_API}/clases`,
      {
        headers: {
          Authorization: '',
        }
      }
    )
      .then((res) => {
        setClases(res.data);
        setClasesFiltradas(res.data);
      })
      .catch((error) => {
        console.error('Error cargando las clases:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${URL_API}/categorias`,
      {
        headers: {
          Authorization: '',
        }
      }
    )
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((error) => {
        console.error('Error cargando las categorias:', error);
      });
  }, []);

  // Calcular clases para mostrar en la página actual
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = clasesFiltradas.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(clasesFiltradas.length / itemsPerPage);

  const handlePageClick = (event) => {  
    const newOffset = (event.selected * itemsPerPage) % clases.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (filtroNombre) {
      const clasesFiltradas = clases.filter(clase => 
        clase.titulo.toLowerCase().includes(filtroNombre.toLowerCase())
      );
      setClasesFiltradas(clasesFiltradas);
    } else {
      setClasesFiltradas(clases);
    }
  }, [filtroNombre]);

  useEffect(() => {
    if (filtroCategoria) {
      const clasesFiltradas = clases.filter(clase => 
        clase.categorias.some(categoria =>
          categoria.nombre.toLowerCase() === filtroCategoria.toLocaleLowerCase()
        )
      );
      setClasesFiltradas(clasesFiltradas);
    } else {
      setClasesFiltradas(clases);
    }
  }, [filtroCategoria]);

  return (
    <main>
      <div className="cabecera">
        <h1>Nuestras Clases</h1>
        <div className="filtros">
          <form>
            <select onChange={ (e) => setFiltroCategoria(e.target.value) }>
              <option value="">Selecciona una categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
            <input type="text" onChange={ (e) => setFiltroNombre(e.target.value) }/>
          </form>
        </div>
      </div>

      <div className="clases">
        {currentItems.map(clase => (
          <Clase key={clase.id} clase={clase} />
        ))}
      </div>

      <div className="paginacion">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaChevronRight size={18}/>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<FaChevronLeft size={18}/>}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </main>
  );
}

export default Main;
