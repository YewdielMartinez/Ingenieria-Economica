import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  IconButton,
  CssBaseline,
  ThemeProvider,
  Box,
  Container,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

export const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Define el tema claro y oscuro con los colores de tu preferencia
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#a93226',
      },
      background: {
        default: darkMode ? '#000000' : '#E0E0E0',
      },
    },
    typography: {
      fontFamily: 'Lato, sans-serif', // Fuente principal para el texto general
      h1: {
        fontFamily: 'Bebas Neue, sans-serif', // Fuente personalizada para los encabezados
      },
      h2: {
        fontFamily: 'Bebas Neue, sans-serif',
      },
      h6: {
        fontFamily: 'Oswald,italic' // Fuente para los botones
      },
    }
  });

  // Alterna entre los modos oscuro y claro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            Ingeniería Económica
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
          <Box display="flex" gap={2} ml={2} flexWrap="wrap">
            {[ // Menú de navegación
              { label: 'Interés Simple', path: 'interes-simple' },
              { label: 'Interés Compuesto', path: 'interes-compuesto' },
              { label: 'Periodo de Recuperación', path: 'periodo-recuperacion' },
              { label: 'VPN', path: 'VPN' },
              { label: 'VAE', path: 'VAE' },
              { label: 'TIR', path: 'TIR' },
            ].map((topic, index) => (
              <Link key={index} to={`/${topic.path}`} style={{ textDecoration: 'none' }}>
                <Typography
                  variant="button"
                  component="div"
                  sx={{
                    color: 'white',
                    backgroundColor: '#2e4053',
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                    '&:hover': {
                      backgroundColor: '#ec7063',
                    },
                  }}
                >
                  {topic.label}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant='h2'component="p" sx={{ mb: 2 }}>
          Que es la Ingenieria Economica?
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 2 }}>
          La ingeniería económica es una disciplina que combina conocimientos de ingeniería con principios de microeconomía para tomar decisiones económicas. Su objetivo es evaluar alternativas de solución a problemas de ingeniería, y así ayudar a aumentar el valor de una empresa.
        </Typography>
        <Typography variant='h2'component="p" sx={{ mb: 2 }}>
          Interés Simple
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 2 }}>
        El interés simple es el beneficio o interés que se obtiene de una inversión o de un préstamo, y se calcula sobre el capital inicial sin incluir los intereses acumulados anteriormente.
        </Typography>
        <Typography variant='h2'component="p" sx={{ mb: 2 }}>
          Interés Compuesto
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 2 }}>
        El interés generado durante cada periodo de interés se calcula sobre el capital más el monto total del interés acumulado en todos los periodos anteriores. Así, el interés compuesto es un interés sobre el interés.        </Typography>
        <Typography variant='h2'component="p" sx={{ mb: 2 }}>
          Periodo de recuperacion de la inversion 
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 2 }}>
        El periodo de recuperación de la inversión (PRI), también conocido como payback, es el tiempo que tarda una empresa en recuperar el dinero invertido en un proyecto. Es una métrica fundamental para determinar si un proyecto es rentable o no.        </Typography>
        <Typography variant='h2'component="p" sx={{ mb: 2 }}>
          Valor Prensente Neto(VPN)
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Es un método que permite determinar si una inversión será rentable o no" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Se calcula restando el costo inicial de la inversión del valor actual de los flujos de efectivo futuros" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Si el VPN es positivo, el proyecto se considera rentable" />
          </ListItem>
          <ListItem>
            <ListItemText primary="El VPN es una fórmula matemática que se basa en el concepto del valor del dinero en el tiempo. Se utiliza para evaluar la rentabilidad de las inversiones y proyectos, y para elaborar presupuestos de capital." />
          </ListItem>
        </List>   
        <Typography variant='h2'component="p" sx={{ mb: 2 }}>
          Valor Anual Equivalente
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 2 }}>
        El valor anual equivalente (VAE) es un criterio de decisión para evaluar proyectos. En el contexto de la evaluación de proyectos de inversión, el VAE es la anualidad que tiene un valor presente igual al valor presente neto del proyecto.  
        </Typography>
        <Typography variant='h2'component="p" sx={{ mb: 2 }}>
          Tasa Interna de Rendimiento
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 2 }}>
        La Tasa Interna de Retorno (TIR) es un indicador financiero que permite evaluar la rentabilidad de una inversión. Se trata de la tasa de descuento que hace que el valor presente neto (VAN) de los flujos de caja futuros de una inversión sea igual a su coste inicial. 
        </Typography>
      </Container>
    </ThemeProvider>
  );
};
