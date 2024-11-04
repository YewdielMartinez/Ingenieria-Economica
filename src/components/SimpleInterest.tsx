import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  CssBaseline,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackButton from './BackButton';
import ResetButton from './ResetButton';
import CalculateButton from './CalculateButton';
import './inputStyle.css';

export const SimpleInterest: React.FC = () => {
  const [calculationMode, setCalculationMode] = useState<'interest' | 'principal' | 'rate' | 'time'>('interest');
  const [principal, setPrincipal] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [time, setTime] = useState<number | string>('');
  const [interest, setInterest] = useState<number | string>('');
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
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
      h2: { fontFamily: 'Bebas Neue, sans-serif' },
      h6: { fontFamily: 'Oswald,italic' },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const calculate = () => {
    const P = Number(principal);
    const r = Number(rate);
    const t = Number(time);
    const I = Number(interest);

    let result;
    switch (calculationMode) {
      case 'interest':
        result = (P * r * t) / 100;
        setInterest(result);
        setTotalAmount(P + result);
        break;
      case 'principal':
        result = (I * 100) / (r * t);
        setPrincipal(result);
        break;
      case 'rate':
        result = (I * 100) / (P * t);
        setRate(result);
        break;
      case 'time':
        result = (I * 100) / (P * r);
        setTime(result);
        break;
      default:
        break;
    }
  };

  const clearInputs = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterest('');
    setTotalAmount(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} fontSize={40}>
            Interés Simple
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Modo de Cálculo</InputLabel>
          <Select
            value={calculationMode}
            label="Modo de Cálculo"
            onChange={(e) => setCalculationMode(e.target.value as 'interest' | 'principal' | 'rate' | 'time')}
          >
            <MenuItem value="interest">Calcular Interés</MenuItem>
            <MenuItem value="principal">Calcular Capital Inicial</MenuItem>
            <MenuItem value="rate">Calcular Tasa de Interés</MenuItem>
            <MenuItem value="time">Calcular Tiempo (años)</MenuItem>
          </Select>
        </FormControl>

        {calculationMode !== 'principal' && (
          <div className="input-group">
            <input
              className="input"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              required
            />
            <label className="user-label">Capital Inicial</label>
          </div>
        )}

        {calculationMode !== 'rate' && (
          <div className="input-group">
            <input
              className="input"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
            />
            <label className="user-label">Tasa de Interés (%)</label>
          </div>
        )}

        {calculationMode !== 'time' && (
          <div className="input-group">
            <input
              className="input"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <label className="user-label">Tiempo (años)</label>
          </div>
        )}

        {calculationMode !== 'interest' && (
          <div className="input-group">
            <input
              className="input"
              type="number"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            />
            <label className="user-label">Interés en dinero</label>
          </div>
        )}

        <Box mt={2} display="flex" justifyContent="space-between">
          <CalculateButton onClick={calculate} />
          <ResetButton onClick={clearInputs} />
        </Box>

        {(calculationMode === 'interest' && interest !== null && totalAmount !== null) && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Interés: ${Number(interest).toFixed(2)}
            </Typography>
            <Typography variant="h6" color="primary">
              Monto Total (Capital + Interés): ${totalAmount.toFixed(2)}
            </Typography>
          </Box>
        )}

        {(calculationMode === 'principal' && principal !== '') && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Capital Inicial: ${Number(principal).toFixed(2)}
            </Typography>
          </Box>
        )}

        {(calculationMode === 'rate' && rate !== '') && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Tasa de Interés: {Number(rate).toFixed(2)}%
            </Typography>
          </Box>
        )}

        {(calculationMode === 'time' && time !== '') && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Tiempo en Años: {Number(time).toFixed(2)}
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

export default SimpleInterest;
