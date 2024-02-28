import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fdfdfd',
    },
    secondary: {
      grey1: "#eaeaea",
      grey2: "#d2d2d2",
      grey3: "#6e6f70",
      blue: "#093C59",
      green: "#226516",
      success: "#1D9129",
      unmanaged: "#b61b11",
      error: "#bc1111",
    },
    common: {
      white: "#fdfdfd",
      black: '#090909',
    },
  },

  typography: {
    titulos: {
      fontSize: '1.75rem',
      fontWeight: 700,
      // ... otros estilos que quieras agregar
    },
    subtitulos: {
      fontSize: '1.25rem',
      fontWeight: 500,
      // ... otros estilos que quieras agregar
    },
    parrafos: {
      fontSize: '0.75rem',
      fontWeight: 300,
      // ... otros estilos que quieras agregar
    },
    parrafosColor: {
      fontSize: '0.75rem',
      fontWeight: 300,
      backgroundColor: '#C2C2C2'
      // ... otros estilos que quieras agregar
    },
  },
  shape: {
    borderRadius: 4,  // Valor por defecto
    borderRadiusSmall: 2,
    borderRadiusMedium: 8,
    borderRadiusLarge: 16,
  },
  // Podes agregar más configuraciones del tema aca cuando necesites
});

export default theme;