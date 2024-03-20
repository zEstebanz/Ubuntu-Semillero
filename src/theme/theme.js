import { createTheme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';

const theme = createTheme({
  palette: {
    primary: {
      main: '#093C59',
    },
    secondary: {
      main: '#c2c2c2',
    },
    green: {
      main: "#226516",
      dark: '#366C00',
      medium: '#70D20F',
      light: '#99FF33'
    },
    oranges: {
      dark: '#DD7200',
      medium: '#F8952C',
      light: '#FDAD58'
    },
    gray: {
      dark: "#6E6F70",
      medium: '#D2D2D2',
      light: "#EAEAEA"
    },
    mode: 'light',
    background: {
      default: '#FDFDFD',
      paper: '#EAEAEA'
    },
    error: {
      main: '#BC1111'
    },
    success: {
      main: '#1D9129'
    },
    warning: {
      main: '#B86B11'
    },
    common: {
      white: "#fdfdfd",
      black: '#090909',
    },
    black: {
      main: "#090909"
    },
    white: {
      main: "#fdfdfd",
    },
    grayDark: {
      main: "#6E6F70"
    }
  },

  typography: {
    titles: {
      fontSize: '1.75rem',
      fontWeight: 700,
      // ... other styles you want to add
    },
    subtitles: {
      fontSize: '1.25rem',
      fontWeight: 500,
      // ... other styles you want to add
    },
    paragraphs: {
      fontSize: '0.75rem',
      fontWeight: 300,
      // ... other styles you want to add
    },
    paragraphsColor: {
      fontSize: '0.75rem',
      fontWeight: 300,
      backgroundColor: '#C2C2C2'
      // ... other styles you want to add
    },
    fontFamily: [
      'Lato',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 4,  // Default value
    borderRadiusSmall: 2,
    borderRadiusMedium: 8,
    borderRadiusLarge: 16,
  },
  // You can add more theme configurations here as needed
});

export default theme;