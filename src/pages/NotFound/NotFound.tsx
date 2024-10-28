// src/pages/NotFound.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

 export const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>404 - Página no encontrada</h2>
      <p>La página que estás buscando no existe.</p>
      <Link to="/">Volver a la página de inicio</Link>
    </div>
  );
};


