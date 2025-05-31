import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import './index.css';
import axios from 'axios';
import Admin from './components/Admin';
import Perfil from './components/Perfil';

// Incluir el token de autorización en las solicitudes de Axios
const token = localStorage.getItem('skillswapToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/mi-perfil' element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
