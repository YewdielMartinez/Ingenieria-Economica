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
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackButton from './BackButton';
import ResetButton from './ResetButton'; // Nuevo botón de reinicio
import CalculateButton from './CalculateButton'; // Nuevo botón de calcular
import './inputStyle.css'; // Importa el archivo CSS con los estilos de input

export const SimpleInterest: React.FC = () => {
  const [principal, setPrincipal] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [time, setTime] = useState<number | string>('');
  const [interest, setInterest] = useState<number | null>(null);
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

  const calculateInterest = () => {
    const P = Number(principal);
    const r = Number(rate);
    const t = Number(time);
    const result = (P * r * t) / 100;
    setInterest(result);
    setTotalAmount(P + result);
  };

  const clearInputs = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterest(null);
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

        {/* Grupo de Inputs */}
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
        <div className="input-group">
          <input
            className="input"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
          <label className="user-label">Tasa de interés (%)</label>
        </div>
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

        <Box mt={2} display="flex" justifyContent="space-between">
          <CalculateButton onClick={calculateInterest} /> {/* Nuevo botón de calcular */}
          <ResetButton onClick={clearInputs} /> {/* Nuevo botón de reinicio */}
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

        <Box mt={3}>
          <BackButton />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SimpleInterest;
