// src/components/TIR.tsx

import React, { useState } from 'react';
import styles from './SimpleInterest.module.css';

export const TIR: React.FC = () => {
  const [cashFlows, setCashFlows] = useState<string>('');
  const [irr, setIrr] = useState<number | null>(null);

  // Función para calcular el VPN dado una tasa de descuento
  const calculaVPN = (rate: number, cashFlows: number[]) => {
    return cashFlows.reduce((vpn, cashFlow, i) => {
      return vpn + cashFlow / Math.pow(1 + rate, i);
    }, 0);
  };

  // Función para calcular la TIR usando búsqueda binaria
  const calculateIRR = () => {
    const cashFlowArray = cashFlows.split(',').map(Number);
    let lowerBound = 0;
    let upperBound = 1;
    let guessRate = (upperBound + lowerBound) / 2;
    const tolerance = 1e-5; // Tolerancia para el resultado

    while (upperBound - lowerBound > tolerance) {
      const vpn = calculaVPN(guessRate, cashFlowArray);

      if (vpn > 0) {
        lowerBound = guessRate;
      } else {
        upperBound = guessRate;
      }

      guessRate = (upperBound + lowerBound) / 2;
    }

    setIrr(guessRate * 100); // Convertir a porcentaje
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setCashFlows('');
    setIrr(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tasa Interna de Rendimiento (TIR)</h2>
      <input
        type="text"
        placeholder="Flujos de efectivo separados por comas (e.g., -1000, 200, 300, 400)"
        value={cashFlows}
        onChange={(e) => setCashFlows(e.target.value)}
        className={styles.input}
      />
      <button onClick={calculateIRR} className={styles.button}>
        Calcular
      </button>
      <button onClick={clearInputs} className={styles.clearButton}>
        Limpiar
      </button>
      {irr !== null && <p className={styles.result}>TIR: {irr.toFixed(2)}%</p>}
    </div>
  );
};
