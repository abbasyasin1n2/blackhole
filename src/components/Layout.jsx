import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  const location = useLocation()

  const navItems = [
    { label: 'Simulation', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Physics', path: '/physics' },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            🌌 Black Hole Explorer
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                sx={{
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(0, 255, 255, 0.2)' 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                  },
                  borderRadius: '8px',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  )
}

export default Layout
