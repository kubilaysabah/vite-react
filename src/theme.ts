import { createTheme } from '@mui/material/styles';

export const dashboardThemes = {
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#4A88D9',
        contrastText: '#B8D3D9'
      },
      secondary: {
        main: '#F2B544',
        dark: '#F2B544',
        contrastText: '#0D0A06'
      },
      success: {
        main: '#02A676'
      },
      warning: {
        main: '#FAE301'
      },
      background: {
        default: '#0D1A26',
        paper: '#142F40'
      }
    }
  }),
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#02d3ff',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#012E40',
        contrastText: '#ffffff'
      },
      success: {
        main: '#02A676'
      },
      warning: {
        main: '#CEF09D'
      },
      text: {
        primary: '#182625',
        secondary: '#4C5958',
        disabled: ''
      },
      background: {
        default: '#FFFFFF',
        paper: '#F2F2F2'
      }
    }
  })
};

export const landingThemes = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        light: '#5BC17F',
        main: '#4F9CF9',
        dark: '#043873',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#FFE492',
        contrastText: '#043873'
      },
      text: {
        primary: '#212529'
      },
      grey: {
        '900': '#212529'
      },
      background: {
        default: '#043873',
        paper: '#4F9CF9'
      }
    }
  }),
  dark: createTheme({
    typography: {
      fontFamily: '"Inter", serif',
    },
    palette: {
      mode: 'light',
      primary: {
        light: '#5BC17F',
        main: '#4F9CF9',
        dark: '#043873',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#FFE492',
        contrastText: '#043873'
      },
      text: {
        primary: '#212529'
      },
      grey: {
        '900': '#212529'
      },
      background: {
        default: '#043873',
        paper: '#4F9CF9'
      }
    }
  })
};
