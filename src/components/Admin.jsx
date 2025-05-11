import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../styles/Admin.css';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1234/usuarios')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
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
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;