

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SimpleInterest.module.css';

export const CompoundInterest: React.FC = () => {
  const [Inicial, setInicial] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [time, setTime] = useState<number | string>('');
  const [compoundsPerYear, setCompoundsPerYear] = useState<number | string>('');
  const [compoundInterest, setCompoundInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  // Calcular el Interés Compuesto
  const calculateCompoundInterest = () => {
    const P = Number(Inicial);
    const r = Number(rate) / 100;
    const t = Number(time);
    const n = Number(compoundsPerYear);

    // Fórmula del Interés Compuesto
    const total = P * Math.pow(1 + r / n, n * t);
    setCompoundInterest(total - P); // Interés compuesto = Monto total - Capital inicial
    setTotalAmount(total); // Total = Capital inicial + Interés
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setInicial('');
    setRate('');
    setTime('');
    setCompoundsPerYear('');
    setCompoundInterest(null);
    setTotalAmount(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Interés Compuesto</h2>
      <input
        type="number"
        placeholder="Capital Inicial"
        value={Inicial}
        onChange={(e) => setInicial(e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="Tasa de interés (%)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="Tiempo (años)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="Compuestos por año"
        value={compoundsPerYear}
        onChange={(e) => setCompoundsPerYear(e.target.value)}
        className={styles.input}
      />
      <button onClick={calculateCompoundInterest} className={styles.button}>
        Calcular
      </button>
      <button onClick={clearInputs} className={styles.clearButton}>
        Limpiar
      </button>
      {compoundInterest !== null && totalAmount !== null && (
        <div className={styles.result}>
          <p>Interés Compuesto: ${compoundInterest.toFixed(2)}</p>
          <p>Monto Total (Capital + Interés): ${totalAmount.toFixed(2)}</p>
        </div>
      )}
      
      {/* Botón para regresar al Home */}
      <Link to="/" className={styles.homeButton}>
        Regresar al Inicio
      </Link>
    </div>
  );
};

export default CompoundInterest;
