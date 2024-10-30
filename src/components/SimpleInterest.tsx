import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const SimpleInterest: React.FC = () => {
  const [principal, setPrincipal] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [time, setTime] = useState<number | string>('');
  const [interest, setInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const navigate = useNavigate();

  // Calcular el interés simple
  const calculateInterest = () => {
    const P = Number(principal);
    const r = Number(rate);
    const t = Number(time);
    const result = (P * r * t) / 100;
    setInterest(result);
    setTotalAmount(P + result); // Monto total = Capital + Interés
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterest(null);
    setTotalAmount(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Interés Simple
      </Typography>
      <TextField
        label="Capital Inicial"
        type="number"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tasa de interés (%)"
        type="number"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tiempo (años)"
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={calculateInterest}>
          Calcular
        </Button>
        <Button variant="outlined" color="secondary" onClick={clearInputs}>
          Limpiar
        </Button>
      </Box>

      {interest !== null && totalAmount !== null && (
        <Box mt={3}>
          <Typography variant="h6" color="primary">
            Interés: ${interest.toFixed(2)}
          </Typography>
          <Typography variant="h6" color="primary">
            Monto Total (Capital + Interés): ${totalAmount.toFixed(2)}
          </Typography>
        </Box>
      )}

      {/* Botón para regresar al Home */}
      <Box mt={3}>
        <Button variant="contained" color="info" onClick={() => navigate('/')}>
          Regresar al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default SimpleInterest;
