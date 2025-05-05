import React, { useState } from 'react';
import axios from 'axios';

function RegisterModal({ onClose }) {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const URL_API = import.meta.env.VITE_URL_API;

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
      onClose();
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
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
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;