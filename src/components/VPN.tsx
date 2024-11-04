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
import DeleteIcon from '@mui/icons-material/Delete';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AnimatedMuiButton from './AnimatedMuiButton.tsx'; // Importa el botón animado

export const VPN: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>('');
  const [discountRate, setDiscountRate] = useState<number | string>('');
  const [cashFlows, setCashFlows] = useState<{ value: number; unit: number }[]>([
    { value: 0, unit: 1 },
  ]);
  const [vpnResult, setVpnResult] = useState<number | null>(null);
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

  // Función para calcular el Valor Presente Neto (VPN)
  const calculateVPN = () => {
    const initial = Number(initialInvestment);
    const rate = Number(discountRate) / 100;
    let totalVPN = -initial;

    cashFlows.forEach((cashFlow, index) => {
      const adjustedCashFlow = cashFlow.value * cashFlow.unit;
      totalVPN += adjustedCashFlow / Math.pow(1 + rate, index + 1);
    });

    setVpnResult(totalVPN);
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setInitialInvestment('');
    setDiscountRate('');
    setCashFlows([{ value: 0, unit: 1 }]);
    setVpnResult(null);
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
            Valor Presente Neto (VPN)
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '10px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" fontFamily={'Bebas Neue, sans-serif'} fontSize={'60px'} gutterBottom>
            Valor Presente Neto (VPN)
          </Typography>

          <TextField
            label="Inversión Inicial"
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            fullWidth
            margin="normal"
            color='secondary'
          />

          <TextField
            label="Tasa de Descuento (%)"
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
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
            {/* Usa el botón animado aquí */}
            <AnimatedMuiButton onClick={addCashFlow} />

            <Button variant="contained" color="primary" onClick={calculateVPN}>
              Calcular VPN
            </Button>
            <Button variant="outlined" color="secondary" onClick={clearInputs}>
              Limpiar
            </Button>
          </Box>

          {vpnResult !== null && (
            <Box mt={3}>
              <Typography variant="h6" fontFamily={'Oswald'} color="primary">
                Valor Presente Neto: ${vpnResult.toFixed(2)}
              </Typography>
            </Box>
          )}

          <Box mt={3}>
            <Button variant="contained" color="info" onClick={goToMainMenu}>
              Regresar al Menú Principal
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default VPN;
