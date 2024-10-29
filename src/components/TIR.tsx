import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export const TIR: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>('');
  const [cashFlows, setCashFlows] = useState<number[]>([0]);
  const [irr, setIrr] = useState<number | null>(null);

  // Función para calcular el VPN dado una tasa de descuento
  const calculaVPN = (rate: number, cashFlows: number[]) => {
    return cashFlows.reduce((vpn, cashFlow, i) => {
      return vpn + cashFlow / Math.pow(1 + rate, i);
    }, 0);
  };

  // Función para calcular la TIR usando búsqueda binaria
  const calculateIRR = () => {
    const cashFlowArray = [Number(initialInvestment), ...cashFlows];
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
    setInitialInvestment('');
    setCashFlows([0]);
    setIrr(null);
  };

  // Agregar un flujo de efectivo adicional
  const addCashFlow = () => {
    setCashFlows([...cashFlows, 0]);
  };

  // Manejar el cambio en cada flujo de efectivo
  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = Number(value);
    setCashFlows(newCashFlows);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tasa Interna de Rendimiento (TIR)
      </Typography>
      <TextField
        label="Inversión Inicial"
        type="number"
        value={initialInvestment}
        onChange={(e) => setInitialInvestment(e.target.value)}
        fullWidth
        margin="normal"
      />

      {cashFlows.map((cashFlow, index) => (
        <Box display="flex" alignItems="center" key={index} sx={{ mt: 1 }}>
          <TextField
            label={`Flujo de Efectivo Año ${index + 1}`}
            type="number"
            value={cashFlow}
            onChange={(e) => handleCashFlowChange(index, e.target.value)}
            fullWidth
          />
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() =>
              setCashFlows(cashFlows.filter((_, i) => i !== index))
            }
            sx={{ ml: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={addCashFlow}
        >
          Agregar Flujo de Efectivo
        </Button>
        <Button variant="contained" color="primary" onClick={calculateIRR}>
          Calcular TIR
        </Button>
        <Button variant="outlined" color="secondary" onClick={clearInputs}>
          Limpiar
        </Button>
      </Box>

      {irr !== null && (
        <Box mt={3}>
          <Typography variant="h6" color="primary">
            TIR: {irr.toFixed(2)}%
          </Typography>
        </Box>
      )}
    </Container>
  );
};
