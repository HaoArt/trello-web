import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  colorSchemes: {
    light: {
      true: true,
      palette: {
        primary: {
          main: '#556cd6',
        },
        secondary: {
          main: '#19857b',
        },
        error: {
          main: '#ff0000',
        },
      },
    },
    dark: {
      true: true,
      palette: {
        primary: {
          main: '#90caf9',
        },
        secondary: {
          main: '#f48fb1',
        },
        error: {
          main: '#ff0000',
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});

export default theme;
