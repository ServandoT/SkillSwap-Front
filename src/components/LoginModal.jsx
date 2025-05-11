import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      console.log('Sending payload:', payload);
      const response = await axios.post('http://localhost:1234/api/v1/auth/authenticate', payload, {
        headers: {
          Authorization: '',
          "Content-Type": "application/json",
        },
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('skillswapToken', response.data.token);

      const res = await axios.get('http://localhost:1234/usuarios/admin', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('skillswapToken')}`,
        }
      });
      console.log('isAdmin:', res.data.isAdmin);

      if (res.data.isAdmin) {
        navigate('/admin');
      }

      // axios.get('http://localhost:1234/usuarios/admin')
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     console.log('isAdmin:', data.isAdmin);
      //     // Si es admin redirigir a la página de admin
      //     if (data.isAdmin) {
      //       navigate('/admin');
      //     }})
      //     .catch((error) => { 
      //       console.error('Error fetching admin status:', error);
      //     });

      onClose();
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        {error && <p>{error}</p>}
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