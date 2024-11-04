import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Switch,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const VAE: React.FC = () => {
  const [vpn, setVpn] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>('');
  const [periods, setPeriods] = useState<number | string>('');
  const [vae, setVae] = useState<number | null>(null);
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

  // Calcular el Valor Anual Equivalente (VAE)
  const calculateVAE = () => {
    const VPN = Number(vpn);
    const i = Number(rate) / 100;
    const n = Number(periods);

    // Fórmula del VAE
    const vaeResult = (VPN * i) / (1 - Math.pow(1 + i, -n));
    setVae(vaeResult);
  };

  // Limpiar los resultados
  const clearInputs = () => {
    setVpn('');
    setRate('');
    setPeriods('');
    setVae(null);
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
            Valor Anual Equivalente (VAE)
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <TextField
          label="Valor Presente Neto (VPN)"
          type="number"
          value={vpn}
          onChange={(e) => setVpn(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tasa de Interés (%)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Número de Períodos (años)"
          type="number"
          value={periods}
          onChange={(e) => setPeriods(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={calculateVAE}>
            Calcular VAE
          </Button>
          <Button variant="outlined" color="secondary" onClick={clearInputs}>
            Limpiar
          </Button>
        </Box>

        {vae !== null && (
          <Box mt={3}>
            <Typography variant="h6" color="primary">
              Valor Anual Equivalente: ${vae.toFixed(2)}
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

export default VAE;
