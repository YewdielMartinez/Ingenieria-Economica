import React, { useState } from 'react';
import styles from './SimpleInterest.module.css';

 export const SimpleInterest: React.FC = () => {
  const [principal, setPrincipal] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [time, setTime] = useState<number | string>('');
  const [interest, setInterest] = useState<number | null>(null);

    //Calcular el interes Simple
  const calculateInterest = () => {
    const result = (Number(principal) * Number(rate) * Number(time)) / 100;
    setInterest(result);
  };

  //Limpiar los resultados
  const clearInputs = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterest(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Interés Simple</h2>
      <input
        type="number"
        placeholder="Capital Inicial"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
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
      <button onClick={calculateInterest} className={styles.button}>
        Calcular
      </button>
      <button onClick={clearInputs} className={styles.clearButton}>
        Limpiar
      </button>
      {interest !== null && <p className={styles.result}>Interés: ${interest}</p>}
    </div>
  );
};

