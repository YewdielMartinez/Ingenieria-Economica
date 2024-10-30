import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export const PaybackPeriod: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>('');
  const [cashFlows, setCashFlows] = useState<{ value: number; unit: number }[]>([
    { value: 0, unit: 1 },
  ]);
  const [paybackPeriod, setPaybackPeriod] = useState<number | null>(null);
  const navigate = useNavigate();

  // Manejar el cambio en los flujos de efectivo
  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index].value = Number(value);
    setCashFlows(newCashFlows);
  };

  // Manejar el cambio en la unidad del flujo de efectivo
  const handleUnitChange = (index: number, unit: number) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index].unit = unit;
    setCashFlows(newCashFlows);
  };

  // Calcular el período de recuperación
  const calculatePaybackPeriod = () => {
    const initial = Number(initialInvestment);
    let cumulativeCashFlow = 0;
    let years = 0;

    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i].value * cashFlows[i].unit;
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
    setCashFlows([{ value: 0, unit: 1 }]);
    setPaybackPeriod(null);
  };

  // Agregar un flujo de efectivo
  const addCashFlow = () => {
    setCashFlows([...cashFlows, { value: 0, unit: 1 }]);
  };

  // Función para regresar al menú principal
  const goToMainMenu = () => {
    navigate('/');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Período de Recuperación de la Inversión
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
            value={cashFlow.value}
            onChange={(e) => handleCashFlowChange(index, e.target.value)}
            fullWidth
          />
          <Select
            value={cashFlow.unit}
            onChange={(e) => handleUnitChange(index, Number(e.target.value))}
            sx={{ ml: 1 }}
          >
            <MenuItem value={1}>Unidades</MenuItem>
            <MenuItem value={1_000}>Miles</MenuItem>
            <MenuItem value={1_000_000}>Millones</MenuItem>
          </Select>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => setCashFlows(cashFlows.filter((_, i) => i !== index))}
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
        <Button variant="contained" color="primary" onClick={calculatePaybackPeriod}>
          Calcular Período
        </Button>
        <Button variant="outlined" color="secondary" onClick={clearInputs}>
          Limpiar
        </Button>
      </Box>

      {paybackPeriod !== null && (
        <Box mt={3}>
          <Typography variant="h6" color="primary">
            Período de Recuperación: {paybackPeriod} años
          </Typography>
        </Box>
      )}

      <Box mt={3}>
        <Button variant="contained" color="info" onClick={goToMainMenu}>
          Regresar al Menú Principal
        </Button>
      </Box>
    </Container>
  );
};
