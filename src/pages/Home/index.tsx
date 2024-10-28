// src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Ingeniería Económica</h1>
        <ul className={styles.navList}>
          <li>
            <Link to="/interes-simple" className={styles.navLink}>Interés Simple</Link>
          </li>
          <li>
            <Link to="/interes-compuesto" className={styles.navLink}>Interés Compuesto</Link>
          </li>
          <li>
            <Link to="/periodo-recuperacion" className={styles.navLink}>Periodo de Recuperación</Link>
          </li>
          <li>
            <Link to="/VPN" className={styles.navLink}>Valor Presente Neto</Link>
          </li>
          <li>
            <Link to="/VAE" className={styles.navLink}>Valor Anual Equivalente</Link>
          </li>
          <li>
            <Link to="/TIR" className={styles.navLink}>Tasa Interna de Rendimiento</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.description}>Selecciona un tema para empezar:</p>
    </div>
  );
};
