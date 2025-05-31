import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginModal.css';

function LoginModal({ onClose, onLoginSuccess }) {
  const URL_API = import.meta.env.VITE_URL_API;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      console.log('Sending payload:', payload);
      const response = await axios.post(`${URL_API}/api/v1/auth/authenticate`, payload, {
        headers: {
          Authorization: '',
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem('skillswapToken', response.data.token);

      if (onLoginSuccess) {
        onLoginSuccess();
      }

      const res = await axios.get(`${URL_API}/usuarios/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('skillswapToken')}`,
        }
      });
      console.log('isAdmin:', res.data.isAdmin);

      if (res.data.isAdmin) {
        navigate('/admin');
      }

      onClose();
    } catch (err) {
      setError('Email o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;