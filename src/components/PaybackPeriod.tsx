import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import BackButton from './BackButton';
import ResetButton from './ResetButton';
import CalculateButton from './CalculateButton';
import './inputStyle.css'; // Estilos de input

export const PaybackPeriod: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>('');
  const [cashFlows, setCashFlows] = useState<{ value: number; unit: number }[]>([
    { value: 0, unit: 1 },
  ]);
  const [paybackPeriod, setPaybackPeriod] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

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

  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index].value = Number(value);
    setCashFlows(newCashFlows);
  };

  const handleUnitChange = (index: number, unit: number) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index].unit = unit;
    setCashFlows(newCashFlows);
  };

  const calculatePaybackPeriod = () => {
    const initial = Number(initialInvestment);
    let cumulativeCashFlow = 0;
    let years = 0;

    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i].value * cashFlows[i].unit;
      if (cumulativeCashFlow >= initial) {
        years = i + 1;
        break;
      }
    }

    setPaybackPeriod(cumulativeCashFlow >= initial ? years : null);
  };

  const clearInputs = () => {
    setInitialInvestment('');
    setCashFlows([{ value: 0, unit: 1 }]);
    setPaybackPeriod(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} fontSize={40}>
            Período de Recuperación
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <TextField
          className="input"
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
              className="input"
              label={`Flujo de Efectivo Año ${index + 1}`}
              type="number"
              value={cashFlow.value}
              onChange={(e) => handleCashFlowChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth sx={{ ml: 1 }}>
              <InputLabel>Unidad</InputLabel>
              <Select
                value={cashFlow.unit}
                onChange={(e) => handleUnitChange(index, Number(e.target.value))}
              >
                <MenuItem value={1}>Unidades</MenuItem>
                <MenuItem value={1_000}>Miles</MenuItem>
                <MenuItem value={1_000_000}>Millones</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => setCashFlows(cashFlows.filter((_, i) => i !== index))}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setCashFlows([...cashFlows, { value: 0, unit: 1 }])}
          >
            Agregar Flujo de Efectivo
          </Button>
          <CalculateButton onClick={calculatePaybackPeriod} />
          <ResetButton onClick={clearInputs} />
        </Box>

        {paybackPeriod !== null && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Período de Recuperación: {paybackPeriod} años
            </Typography>
          </Box>
        )}

        <Box mt={3}>
          <BackButton />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PaybackPeriod;
