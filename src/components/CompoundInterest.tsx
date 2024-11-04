import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  CssBaseline,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './inputStyle.css';

export const CompoundInterest: React.FC = () => {
  const [calculationMode, setCalculationMode] = useState<'interest' | 'principal' | 'rate' | 'time'>('interest');
  const [initial, setInitial] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [time, setTime] = useState<number | string>('');
  const [desiredAmount, setDesiredAmount] = useState<number | string>('');
  const [result, setResult] = useState<number | null>(null);
  const [compoundInterest, setCompoundInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<'anual' | 'bimestral' | 'mensual' | 'quincenal' | 'trimestral'>('anual');
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
      h2: { fontFamily: 'Bebas Neue, sans-serif' },
      h6: { fontFamily: 'Oswald, italic' },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Calcular según el modo seleccionado
  const calculateCompoundInterest = () => {
    const P = Number(initial);
    const A = Number(desiredAmount);
    const r = Number(rate) / 100;
    const t = Number(time);
    const n = getCompoundsPerYear(frequency);

    let calculationResult;

    switch (calculationMode) {
      case 'interest': {
        const total = P * Math.pow(1 + r / n, n * t);
        setCompoundInterest(total - P);
        setTotalAmount(total);
        break;
      }
      case 'principal': {
        calculationResult = A / Math.pow(1 + r / n, n * t);
        setResult(calculationResult);
        break;
      }
      case 'rate': {
        calculationResult = (Math.pow(A / P, 1 / (n * t)) - 1) * n * 100;
        setResult(calculationResult);
        break;
      }
      case 'time': {
        calculationResult = Math.log(A / P) / (n * Math.log(1 + r / n));
        setResult(calculationResult);
        break;
      }
      default:
        break;
    }
  };

  const getCompoundsPerYear = (frequency: string) => {
    switch (frequency) {
      case 'anual':
        return 1;
      case 'bimestral':
        return 6;
      case 'mensual':
        return 12;
      case 'quincenal':
        return 24;
      case 'trimestral':
        return 4;
      default:
        return 1;
    }
  };

  const clearInputs = () => {
    setInitial('');
    setRate('');
    setTime('');
    setDesiredAmount('');
    setCompoundInterest(null);
    setTotalAmount(null);
    setResult(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} fontSize={40}>
            Cálculo de Interés Compuesto
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Modo de Cálculo</InputLabel>
          <Select
            value={calculationMode}
            onChange={(e) => setCalculationMode(e.target.value as 'interest' | 'principal' | 'rate' | 'time')}
          >
            <MenuItem value="interest">Calcular Interés Compuesto</MenuItem>
            <MenuItem value="principal">Calcular Capital Inicial</MenuItem>
            <MenuItem value="rate">Calcular Tasa de Interés</MenuItem>
            <MenuItem value="time">Calcular Tiempo (años)</MenuItem>
          </Select>
        </FormControl>

        {(calculationMode !== 'principal') && (
          <TextField
            className="input"
            label="Capital Inicial (P)"
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}

        {(calculationMode !== 'rate') && (
          <TextField
            className="input"
            label="Tasa de interés (%)"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}

        {(calculationMode !== 'time') && (
          <TextField
            className="input"
            label="Tiempo (años)"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}

        {(calculationMode !== 'interest') && (
          <TextField
            className="input"
            label="Monto Final Deseado (A)"
            type="number"
            value={desiredAmount}
            onChange={(e) => setDesiredAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Frecuencia de Capitalización</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'anual' | 'bimestral' | 'mensual' | 'quincenal' | 'trimestral')}
          >
            <MenuItem value="anual">Anual</MenuItem>
            <MenuItem value="bimestral">Bimestral</MenuItem>
            <MenuItem value="mensual">Mensual</MenuItem>
            <MenuItem value="quincenal">Quincenal</MenuItem>
            <MenuItem value="trimestral">Trimestral</MenuItem>
          </Select>
        </FormControl>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={calculateCompoundInterest}>
            Calcular
          </Button>
          <Button variant="outlined" color="secondary" onClick={clearInputs}>
            Limpiar
          </Button>
        </Box>

        {calculationMode === 'interest' && compoundInterest !== null && totalAmount !== null && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Interés Compuesto: ${compoundInterest.toFixed(2)}
            </Typography>
            <Typography variant="h6" color="primary">
              Monto Total (P + Interés): ${totalAmount.toFixed(2)}
            </Typography>
          </Box>
        )}

        {calculationMode === 'principal' && result !== null && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Capital Inicial (P): ${result.toFixed(2)}
            </Typography>
          </Box>
        )}

        {calculationMode === 'rate' && result !== null && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Tasa de Interés (%): {result.toFixed(2)}
            </Typography>
          </Box>
        )}

        {calculationMode === 'time' && result !== null && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Tiempo (años): {result.toFixed(2)}
            </Typography>
            {/* Aquí podrías incluir el código para convertir el tiempo en detalle */}
          </Box>
        )}

        <Box mt={3}>
          <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
            Volver a la Página Principal
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CompoundInterest;
