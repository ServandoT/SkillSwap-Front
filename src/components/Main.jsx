// import React, { use, useEffect, useState } from 'react';
// import axios from 'axios';
// import Clase from './Clase';
// import '../styles/Main.css';

// function Main() {
//   const URL_API = import.meta.env.VITE_URL_API;
//   const [clases, setClases] = useState([]);
//   const [categorias, setCategorias] = useState([]);

//   useEffect(() => {
//     axios.get(`${URL_API}/clases`, {
//       headers: {
//         Authorization: '',
//       }
//     })
//       .then((res) => {
//         setClases(res.data);
//       })
//       .catch((error) => {
//         console.error('Error cargando las clases:', error);
//       });
//   }, []);

//   useEffect(() => {
//     axios.get(`${URL_API}/categorias`, {
//       headers: {
//         Authorization: '',
//       }
//     })
//       .then((res) => {
//         setCategorias(res.data);
//       })
//       .catch((error) => {
//         console.error('Error cargando las categorias:', error);
//       });
//   }, []);

//   return (
//     <main>

//       <div className="cabecera">
//         <h1>Nuestras Clases</h1>
//         <div className="filtros">
//           <form>
//             <select>
//               <option value="">Selecciona una categoria</option>
//               {categorias.map((categoria) => (
//                 <option key={categoria.id} value={categoria.id}>
//                   {categoria.nombre}
//                 </option>
//               ))}
//             </select>
//           </form>
//         </div>
//       </div>

//       <div className="clases">
//         {clases.map(clase => (
//           <Clase clase={clase} />
//         ))}
//       </div>
//     </main>
//   );
// }

// export default Main;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Clase from './Clase';
import ReactPaginate from 'react-paginate';
import '../styles/Main.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Main() {
  const URL_API = import.meta.env.VITE_URL_API;
  const [clases, setClases] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

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
  const currentItems = clases.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(clases.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % clases.length;
    setItemOffset(newOffset);
  };

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
