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
  AppBar,
  Toolbar,
  CssBaseline,
  Switch,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const TIR: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>('');
  const [cashFlows, setCashFlows] = useState<{ value: number; unit: number }[]>([
    { value: 0, unit: 1 },
  ]);
  const [irr, setIrr] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#a93226' },
      background: { default: darkMode ? '#000000' : '#E0E0E0' },
    },
    typography: {
      fontFamily: 'Lato, sans-serif',
      h1: { fontFamily: 'Bebas Neue, sans-serif' },
      h6: { fontFamily: 'Oswald, italic' },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Función para calcular el VPN dado una tasa de descuento
  const calculaVPN = (rate: number, cashFlows: { value: number; unit: number }[]) => {
    return cashFlows.reduce((vpn, cashFlow, i) => {
      const adjustedCashFlow = cashFlow.value * cashFlow.unit;
      return vpn + adjustedCashFlow / Math.pow(1 + rate, i);
    }, 0);
  };

  // Función para calcular la TIR usando búsqueda binaria
  const calculateIRR = () => {
    const cashFlowArray = [{ value: -Number(initialInvestment), unit: 1 }, ...cashFlows];
    let lowerBound = 0;
    let upperBound = 1;
    let guessRate = (upperBound + lowerBound) / 2;
    const tolerance = 1e-5;

    while (upperBound - lowerBound > tolerance) {
      const vpn = calculaVPN(guessRate, cashFlowArray);
      if (vpn > 0) {
        lowerBound = guessRate;
      } else {
        upperBound = guessRate;
      }
      guessRate = (upperBound + lowerBound) / 2;
    }

    setIrr(guessRate * 100);
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setInitialInvestment('');
    setCashFlows([{ value: 0, unit: 1 }]);
    setIrr(null);
  };

  // Agregar un flujo de efectivo adicional
  const addCashFlow = () => {
    setCashFlows([...cashFlows, { value: 0, unit: 1 }]);
  };

  // Manejar el cambio en el valor del flujo de efectivo
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

  // Función para regresar al menú principal
  const goToMainMenu = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} fontSize={40}>
            Tasa Interna de Rendimiento (TIR)
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
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

        <Box mt={3}>
          <Button variant="contained" color="info" onClick={goToMainMenu}>
            Regresar al Menú Principal
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TIR;
