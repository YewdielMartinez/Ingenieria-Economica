import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CompoundInterest: React.FC = () => {
  const [initial, setInitial] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [time, setTime] = useState<number | string>('');
  const [compoundsPerYear, setCompoundsPerYear] = useState<number | string>('');
  const [unit, setUnit] = useState<number>(1); // Nuevo estado para la unidad
  const [compoundInterest, setCompoundInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const navigate = useNavigate();

  // Calcular el Interés Compuesto
  const calculateCompoundInterest = () => {
    const P = Number(initial) * unit; // Multiplica el capital inicial por la unidad seleccionada
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
    setInitial('');
    setRate('');
    setTime('');
    setCompoundsPerYear('');
    setCompoundInterest(null);
    setTotalAmount(null);
    setUnit(1); // Resetear unidad a "Unidades"
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Interés Compuesto
      </Typography>
      <TextField
        label="Capital Inicial"
        type="number"
        value={initial}
        onChange={(e) => setInitial(e.target.value)}
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
      <TextField
        label="Compuestos por año"
        type="number"
        value={compoundsPerYear}
        onChange={(e) => setCompoundsPerYear(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Select
        value={unit}
        onChange={(e) => setUnit(Number(e.target.value))}
        displayEmpty
        sx={{ mt: 2, mb: 2, minWidth: 120 }}
      >
        <MenuItem value={1}>Unidades</MenuItem>
        <MenuItem value={1_000}>Miles</MenuItem>
        <MenuItem value={1_000_000}>Millones</MenuItem>
      </Select>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={calculateCompoundInterest}>
          Calcular
        </Button>
        <Button variant="outlined" color="secondary" onClick={clearInputs}>
          Limpiar
        </Button>
      </Box>

      {compoundInterest !== null && totalAmount !== null && (
        <Box mt={3}>
          <Typography variant="h6" color="primary">
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

export default CompoundInterest;
