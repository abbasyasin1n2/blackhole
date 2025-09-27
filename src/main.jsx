import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'

// Create a dark theme for the black hole application
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff',
      light: '#33ffff',
      dark: '#0099cc',
    },
    secondary: {
      main: '#ff6600',
      light: '#ff8833',
      dark: '#cc4400',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#00ffff',
      textShadow: '0 0 20px #00ffff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#ff6600',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#00ff00',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 46, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
