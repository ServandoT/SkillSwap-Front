import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import '../styles/Header.css';
import { isAuthenticated } from '../utils/ValidarJWT';

function Header() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [autenticado, setAutenticado] = useState(isAuthenticated());

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('skillswapToken');
    setAutenticado(false);
    window.location.href = '/';
  }

  const handleLoginSuccess = () => {
    setAutenticado(true); // actualizar estado para ocultar botones
    setIsModalOpen(false);
  };


  return (
    <header className='header'>
      <h1>
        <Link to="/">SkillSwap</Link>
        <img src="../../public/principal.svg" alt="logo" />
      </h1>
      {location.pathname !== '/about' && (
        <div>
          {location.pathname !== '/' && (
            <Link to="/">Home</Link>
          )}
          <Link to="/about">About Us</Link>
          {autenticado ? (
            <>
            <Link to="/mi-perfil">Mi perfil</Link>
            <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleLoginClick}>Login</button>
              <button onClick={handleRegisterClick}>Register</button>
            </>
          )}

        </div>
      )}
      {isModalOpen && <LoginModal onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />}
      {isRegisterModalOpen && <RegisterModal onClose={handleCloseRegisterModal} />}
    </header>
  );
}

export default Header;