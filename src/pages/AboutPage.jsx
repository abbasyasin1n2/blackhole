import React from 'react'
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Divider,
} from '@mui/material'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  const scientists = [
    {
      name: 'Karl Schwarzschild (1873-1916)',
      contribution: 'Derived the first exact solution to Einstein\'s field equations, describing the spacetime around a non-rotating black hole.',
    },
    {
      name: 'Subrahmanyan Chandrasekhar (1910-1995)',
      contribution: 'Calculated the maximum mass of a white dwarf (Chandrasekhar limit), leading to the understanding that more massive stars must collapse to black holes.',
    },
    {
      name: 'Stephen Hawking (1942-2018)',
      contribution: 'Theorized Hawking radiation, showing that black holes slowly evaporate due to quantum effects near the event horizon.',
    },
    {
      name: 'Kip Thorne (1940-present)',
      contribution: 'Pioneered gravitational wave research and contributed to the theoretical understanding of black hole physics.',
    },
  ]

  const glossaryItems = [
    { term: 'Event Horizon', definition: 'The boundary around a black hole beyond which no information can escape.' },
    { term: 'Accretion Disk', definition: 'A disk of matter orbiting a black hole, heated by friction and gravitational energy.' },
    { term: 'Schwarzschild Radius', definition: 'The radius of the event horizon for a non-rotating black hole.' },
    { term: 'Hawking Radiation', definition: 'Theoretical radiation emitted by black holes due to quantum effects.' },
    { term: 'Gravitational Lensing', definition: 'The bending of light by massive objects, creating magnification and distortion effects.' },
    { term: 'Spaghettification', definition: 'The stretching of objects by tidal forces near a black hole.' },
    { term: 'Kerr Metric', definition: 'The mathematical description of spacetime around a rotating black hole.' },
    { term: 'Penrose Process', definition: 'A theoretical method to extract energy from a rotating black hole.' },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,102,0,0.1))',
          border: '1px solid rgba(0,255,255,0.3)',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center">
          🌌 Black Holes: A Complete Guide
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Understanding the most extreme objects in the universe
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* What Are Black Holes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main' }}>
              🔬 What Are Black Holes?
            </Typography>
            <Typography variant="body1" paragraph>
              Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon. They represent the most extreme manifestation of Einstein's theory of general relativity.
            </Typography>
            
            <Paper
              sx={{
                p: 2,
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid #00ff00',
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: 'success.main', mb: 1 }}>
                Schwarzschild Radius (Event Horizon):
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'success.main' }}>
                R<sub>s</sub> = 2GM/c²
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Where G is the gravitational constant, M is mass, and c is the speed of light
              </Typography>
            </Paper>

            <Typography variant="h4" sx={{ color: 'primary.main', mt: 3, mb: 2 }}>
              Types of Black Holes
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Stellar Black Holes"
                  secondary="Formed from the collapse of massive stars (3-20 solar masses)"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Intermediate Black Holes"
                  secondary="Mass range of 100-100,000 solar masses"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Supermassive Black Holes"
                  secondary="Found at galaxy centers (millions to billions of solar masses)"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Primordial Black Holes"
                  secondary="Hypothetical black holes formed in the early universe"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Formation and Evolution */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main' }}>
              ⚡ Formation and Evolution
            </Typography>
            
            <Typography variant="h4" sx={{ color: 'primary.main', mt: 3, mb: 2 }}>
              Stellar Collapse
            </Typography>
            <Typography variant="body1" paragraph>
              When a massive star (more than 25 solar masses) exhausts its nuclear fuel, it can no longer support itself against gravitational collapse. The core collapses in seconds, creating a supernova explosion and leaving behind a black hole.
            </Typography>

            <Typography variant="h4" sx={{ color: 'primary.main', mt: 3, mb: 2 }}>
              Accretion and Growth
            </Typography>
            <Typography variant="body1" paragraph>
              Black holes grow by accreting matter from their surroundings. As matter falls toward the black hole, it forms an accretion disk and releases enormous amounts of energy through friction and gravitational heating.
            </Typography>

            <Paper
              sx={{
                p: 2,
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid #00ff00',
              }}
            >
              <Typography variant="h6" sx={{ color: 'success.main', mb: 1 }}>
                Accretion Disk Temperature:
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'success.main' }}>
                T ∝ (M·ṁ)<sup>1/4</sup> × r<sup>-3/4</sup>
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Where ṁ is the accretion rate and r is the distance from the black hole
              </Typography>
            </Paper>
          </Paper>
        </Grid>

        {/* Effects on Spacetime */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main' }}>
              🌍 Effects on Spacetime
            </Typography>
            
            <Typography variant="h4" sx={{ color: 'primary.main', mt: 3, mb: 2 }}>
              Gravitational Lensing
            </Typography>
            <Typography variant="body1" paragraph>
              Einstein predicted that massive objects bend spacetime, causing light to follow curved paths. This creates lensing effects where we can see light from behind the black hole.
            </Typography>

            <Typography variant="h4" sx={{ color: 'primary.main', mt: 3, mb: 2 }}>
              Time Dilation
            </Typography>
            <Typography variant="body1" paragraph>
              Time runs slower near black holes due to gravitational time dilation. An observer far from the black hole would see matter falling toward it appear to slow down and redshift as it approaches the event horizon.
            </Typography>

            <Typography variant="h4" sx={{ color: 'primary.main', mt: 3, mb: 2 }}>
              Tidal Forces
            </Typography>
            <Typography variant="body1" paragraph>
              The difference in gravitational force across an object near a black hole creates extreme tidal forces that can stretch and compress matter - a process called "spaghettification."
            </Typography>
          </Paper>
        </Grid>

        {/* Key Scientists */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main' }}>
              🎓 Key Scientists and Discoveries
            </Typography>
            <Grid container spacing={3}>
              {scientists.map((scientist, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: 'rgba(0, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 255, 255, 0.2)',
                      '&:hover': {
                        border: '1px solid rgba(0, 255, 255, 0.5)',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                        {scientist.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        {scientist.contribution}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Glossary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main' }}>
              📖 Glossary of Terms
            </Typography>
            <Grid container spacing={2}>
              {glossaryItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid #333',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      {item.term}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.definition}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Interactive Demo */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: 'rgba(255, 102, 0, 0.1)',
              border: '1px solid #ff6600',
            }}
          >
            <Typography variant="h4" sx={{ color: 'secondary.main', mb: 2 }}>
              🎮 Try the Interactive Simulation!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Experience black hole physics in real-time with our 3D simulation
            </Typography>
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'inline-block',
                px: 4,
                py: 2,
                backgroundColor: 'secondary.main',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '1.1em',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 5px 15px rgba(255, 102, 0, 0.4)',
                },
                transition: 'all 0.3s',
              }}
            >
              Launch Simulation →
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutPage
