

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SimpleInterest.module.css';

export const VPN: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>('');
  const [discountRate, setDiscountRate] = useState<number | string>('');
  const [cashFlows, setCashFlows] = useState<number[]>([0]);
  const [VPN, setVPN] = useState<number | null>(null);

  // Manejar el cambio en los flujos de efectivo
  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = Number(value);
    setCashFlows(newCashFlows);
  };

  // Calcular el Valor Presente Neto
  const calculateVPN = () => {
    const initial = Number(initialInvestment);
    const rate = Number(discountRate) / 100;
    let totalVPN = -initial; 

    cashFlows.forEach((cashFlow, index) => {
      totalVPN += cashFlow / Math.pow(1 + rate, index + 1); 
    });

    setVPN(totalVPN);
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setInitialInvestment('');
    setDiscountRate('');
    setCashFlows([0]); 
    setVPN(null);
  };

 
  const addCashFlow = () => {
    setCashFlows([...cashFlows, 0]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Valor Presente Neto (VPN)</h2>
      <input
        type="number"
        placeholder="Inversión Inicial"
        value={initialInvestment}
        onChange={(e) => setInitialInvestment(e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="Tasa de Descuento (%)"
        value={discountRate}
        onChange={(e) => setDiscountRate(e.target.value)}
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
      <button onClick={calculateVPN} className={styles.button}>
        Calcular VPN
      </button>
      <button onClick={clearInputs} className={styles.clearButton}>
        Limpiar
      </button>

      {VPN !== null && (
        <div className={styles.result}>
          <p>Valor Presente Neto: ${VPN.toFixed(2)}</p>
        </div>
      )}

      <Link to="/" className={styles.homeButton}>
        Regresar al Inicio
      </Link>
    </div>
  );
};


