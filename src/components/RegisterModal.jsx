import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function RegisterModal({ onClose }) {
  const URL_API = import.meta.env.VITE_URL_API;
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO cambiar la URL por localhost
      const response = await axios.post(
        `${URL_API}/api/v1/auth/register`, 
        {
        nombre,
        apellidos,
        email,
        password,
        creditos: 100,
      },
      {
        headers:{
          Authorization: '',
        }
      }
    );
      console.log('Registration successful:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Tu cuenta ha sido creada exitosamente.',
      });
      onClose();
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className='modal-content'>
        <h2>Resgistro</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Apellidos</label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;