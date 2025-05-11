import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import '../styles/Header.css';

function Header() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      )}
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
      {isRegisterModalOpen && <RegisterModal onClose={handleCloseRegisterModal} />}
    </header>
  );
}

export default Header;