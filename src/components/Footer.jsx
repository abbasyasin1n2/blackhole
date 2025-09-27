import React from 'react'
import { Box, Typography, Container } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderTop: '1px solid #333',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            🌌 Created with React, Three.js, and Material-UI
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Interactive 3D Black Hole Simulation • Educational Physics Platform
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © 2024 Black Hole Explorer
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
