import { createTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';
// Create a theme instance.
const theme = createTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight:COLUMN_HEADER_HEIGHT,
    columnFooterHeight:COLUMN_FOOTER_HEIGHT

  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#3f51b5',
          50: '#3f51b54a',
        },
        secondary: {
          main: '#ff4081',
        },
        error: {
          main: '#d32f2f',
        },
        background: {
          default: '#f0f0f0',
          paper: '#ffffff',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
          color: 'white',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#bb86fc',
          50: '#bb86fc82',
        },
        secondary: {
          main: '#ff4081',
        },
        error: {
          main: '#cf6679',
        },
        background: {
          default: '#1a1a1a',
          paper: '#2c2c2c',
        },
        text: {
          primary: '#e0e0e0',
          secondary: '#bdbdbd',
          color: 'black',
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            with: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#555',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
          };
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light,
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light,
              },
            },
            '& fieldset': {
              borderWidth: '1px !important',
            },
          };
        },
      },
    },
  },
});

export default theme;
