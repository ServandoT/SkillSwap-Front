import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../styles/Admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarioNombre, setUsuarioNombre] = useState(null);
  const [usuarioApellidos, setUsuarioApellidos] = useState(null);
  const [usuarioEmail, setUsuarioEmail] = useState(null);
  const [usuarioCreditos, setUsuarioCreditos] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1234/usuarios')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      axios.delete(`http://localhost:1234/usuarios/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => alert('Error eliminando usuario: ' + error));
    }
  };

  const mostrarFormularioEditar = (id) => {
    setMostrarFormulario(!mostrarFormulario);
    setUsuarioEditar(id);
  }

  const editarUsuario = async () => {

    await axios.put(`http://localhost:1234/usuarios/${usuarioEditar}`, {
      "nombre": usuarioNombre,
      "apellidos": usuarioApellidos,
      "email": usuarioEmail,
      "creditos": usuarioCreditos
    })
      .then(() => { 

        setUsers(users.map(user =>
          user.id === usuarioEditar
            ? {
              ...user,
              nombre: usuarioNombre || user.nombre,
              apellidos: usuarioApellidos || user.apellidos,
              email: usuarioEmail || user.email,
              creditos: usuarioCreditos || user.creditos
            }
            : user
        ));
        setMostrarFormulario(false);
        setUsuarioEditar(null);
      })
      .catch(error => alert('Error editando usuario: ' + error));

    setUsuarioNombre(null);
    setUsuarioApellidos(null);
    setUsuarioEmail(null);
    setUsuarioCreditos(null);
  }

  const cambiarNombre = (e) => {
    setUsuarioNombre(e.target.value);
    console.log(e.target.value);

  }

  const cambiarApellidos = (e) => {
    setUsuarioApellidos(e.target.value);
  }

  const cambiarEmail = (e) => {
    setUsuarioEmail(e.target.value);
  }

  const cambiarCreditos = (e) => {
    setUsuarioCreditos(e.target.value);
  }

  // Categorías
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:1234/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));      
  }, []);

  const borrarCategoria = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      axios.delete(`http://localhost:1234/categorias/${id}`)
        .then(() => {
          setCategorias(categorias.filter(categoria => categoria.id !== id));
        })
        .catch(error => alert('Error eliminando categoría: ' + error));
    }
  }

  const cambiarCategoria = (e) => {
    setCategoria(e.target.value);
  }

  const addCategoria = (e) => {
    e.preventDefault();
    if (categoria) {
      axios.post('http://localhost:1234/categorias', {
        "nombre": categoria
      })
        .then(response => {
          setCategorias([...categorias, response.data]);
          e.target.value = '';
          setCategoria(null);
        })
        .catch(error => alert('Error añadiendo categoría: ' + error));
    } else {
      alert('Por favor, introduce un nombre para la categoría.');
    }
  }

  return (
    <div className='admin'>
      <Header />
      <div className="usuarios">
        <h2>Usuarios</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Apellidos:</strong> {user.apellidos}</p>
              <p><strong>Créditos:</strong> {user.creditos}</p>
              <p><strong>Rol:</strong> {user.rol === 'ADMIN' ? 'Administrador' : 'Usuario normal'}</p>
              <button className='boton-eliminar-usuario' onClick={() => handleDelete(user.id)}>Eliminar</button>
              <button className='boton-editar-usuario' onClick={() => mostrarFormularioEditar(user.id)}>Editar</button>
              {mostrarFormulario && user.id === usuarioEditar && (
                <form>
                  <label>Nombre:</label>
                  <input type="text" defaultValue={user.nombre} onChange={(e) => cambiarNombre(e)} />
                  <label>Apellidos:</label>
                  <input type="text" defaultValue={user.apellidos} onChange={(e) => cambiarApellidos(e)} />
                  <label>Email:</label>
                  <input type="email" defaultValue={user.email} onChange={(e) => cambiarEmail(e)} />
                  <label>Créditos:</label>
                  <input type="number" defaultValue={user.creditos} onChange={(e) => cambiarCreditos(e)} />
                  <button type="button" onClick={() => editarUsuario()}>Guardar</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="categorias">
        <h2>Categorías</h2>

        <form action="">
          <label>Nueva categoría:</label>
          <input type="text" onChange={(e) => cambiarCategoria(e)}/>
          <button type="button" onClick={(e) => addCategoria(e)}>Añadir</button>
        </form>

        <ul>
          {categorias.map(categoria => (
            <li key={categoria.id}>
              <p><strong>Nombre:</strong> {categoria.nombre}</p>
              <button className='boton-eliminar-categoria' onClick={() => borrarCategoria(categoria.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;