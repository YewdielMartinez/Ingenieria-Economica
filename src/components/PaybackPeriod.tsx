// src/components/PaybackPeriod.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PaybackPeriod.module.css';

export const PaybackPeriod: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>('');
  const [cashFlows, setCashFlows] = useState<number[]>([0]);
  const [paybackPeriod, setPaybackPeriod] = useState<number | null>(null);

  // Manejar el cambio en los flujos de efectivo
  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = Number(value);
    setCashFlows(newCashFlows);
  };

  // Calcular el período de recuperación
  const calculatePaybackPeriod = () => {
    const initial = Number(initialInvestment);
    let cumulativeCashFlow = 0;
    let years = 0;

    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i];
      if (cumulativeCashFlow >= initial) {
        years = i + 1; // Años (i comienza en 0)
        break;
      }
    }

    setPaybackPeriod(cumulativeCashFlow >= initial ? years : null);
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setInitialInvestment('');
    setCashFlows([0]); // Reiniciar a un solo flujo de efectivo
    setPaybackPeriod(null);
  };

  // Agregar un flujo de efectivo
  const addCashFlow = () => {
    setCashFlows([...cashFlows, 0]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Período de Recuperación de la Inversión</h2>
      <input
        type="number"
        placeholder="Inversión Inicial"
        value={initialInvestment}
        onChange={(e) => setInitialInvestment(e.target.value)}
        className={styles.input}
      />

      {cashFlows.map((cashFlow, index) => (
        <input
          key={index}
          type="number"
          placeholder={`Flujo de Efectivo Año ${index + 1}`}
          value={cashFlow}
          onChange={(e) => handleCashFlowChange(index, e.target.value)}
          className={styles.input}
        />
      ))}
      <button onClick={addCashFlow} className={styles.button}>
        Agregar Flujo de Efectivo
      </button>
      <button onClick={calculatePaybackPeriod} className={styles.button}>
        Calcular Período
      </button>
      <button onClick={clearInputs} className={styles.clearButton}>
        Limpiar
      </button>

      {paybackPeriod !== null && (
        <div className={styles.result}>
          <p>Período de Recuperación: {paybackPeriod} años</p>
        </div>
      )}

      {/* Botón para regresar al Home */}
      <Link to="/" className={styles.homeButton}>
        Regresar al Inicio
      </Link>
    </div>
  );
};


