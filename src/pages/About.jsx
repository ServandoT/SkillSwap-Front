import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';
import '../styles/About.css';

function About() {
  return (
    <div className='app'>
      <Header />
      <main className='about'>

        <div className="hero">
          <h1>Aprende, Comparte y Crece con SkillSwap</h1>
          <p>Regístrate gratis y comienza tu biaje de aprendizaje hoy mismo</p>
          <button>¡Accede ya!</button>
        </div>

        <section className='primera-seccion'>
          <img src="/cerebro.jpg" alt="cerebro" />

          <div className='wrapper'>
            <p>SkillSwap es un espacio donde puedes aprender nuevas habilidades y enseñar lo que sabes sin necesidad de dinero. A través de un sistema de créditos, puedes impartir clases y ganar créditos para inscribirte en otras.</p>
          </div>
        </section>

        <section className='segunda-seccion'>
          <h2>¿Cómo funciona?</h2>
          <div className="wrapper">
            <ol>
              <li>Regístrate y recibe créditos iniciales.</li>
              <li>Elige una clase que te interese y úsalo para inscribirte.</li>
              <li>Comparte tu conocimiento ofreciendo clases y gana más créditos.</li>
              <li>Aprende sin límites e intercambia habilidades con otros usuarios.</li>
            </ol>
          </div>
          <img src="networking.png" alt="networking" />
        </section>

        <section className='tercera-seccion'>
          <h2>¿Para quién es esta Plataforma?</h2>
          <div className="wrapper">
            <ul>
              <li>Estudiantes que buscan apoyo en diferentes materias.</li>
              <li>Profesionales que quieren mejorar sus habilidades.</li>
              <li>Personas apasionadas por compartir sus conocimientos.</li>
            </ul>
          </div>
          <img src="mochila.png" alt="mochila" />
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default About;