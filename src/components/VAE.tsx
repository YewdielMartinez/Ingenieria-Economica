
import React, { useState } from 'react';
import styles from './SimpleInterest.module.css';

export const VAE: React.FC = () => {
  const [vpn, setVpn] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [periods, setPeriods] = useState<number | string>('');
  const [vae, setVae] = useState<number | null>(null);

  // Calcular el Valor Anual Equivalente
  const calculateVAE = () => {
    const VPN = Number(vpn);
    const i = Number(rate) / 100;
    const n = Number(periods);

    // Fórmula del VAE
    const vaeResult = (VPN * i) / (1 - Math.pow(1 + i, -n));
    setVae(vaeResult);
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setVpn('');
    setRate('');
    setPeriods('');
    setVae(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Valor Anual Equivalente</h2>
      <input
        type="number"
        placeholder="Valor Presente Neto (VPN)"
        value={vpn}
        onChange={(e) => setVpn(e.target.value)}
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
        placeholder="Número de períodos (años)"
        value={periods}
        onChange={(e) => setPeriods(e.target.value)}
        className={styles.input}
      />
      <button onClick={calculateVAE} className={styles.button}>
        Calcular
      </button>
      <button onClick={clearInputs} className={styles.clearButton}>
        Limpiar
      </button>
      {vae !== null && <p className={styles.result}>VAE: ${vae.toFixed(2)}</p>}
    </div>
  );
};
