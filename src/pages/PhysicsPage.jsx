import React, { useState } from 'react'
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material'

const PhysicsPage = () => {
  const [mass, setMass] = useState(4.3)
  const [lensMass, setLensMass] = useState(4.3)
  const [impactParam, setImpactParam] = useState(1)
  const [schwarzschildResult, setSchwarzschildResult] = useState({
    radius: 12.7,
    radiusKm: 12700000,
    radiusM: 12700000000
  })
  const [lensingResult, setLensingResult] = useState({
    angle: 1.75,
    angleRad: 8.48e-6
  })

  const calculateSchwarzschild = () => {
    const solarMass = 1.989e30 // kg
    const G = 6.67430e-11 // m³/kg/s²
    const c = 299792458 // m/s
    
    const rs = (2 * G * mass * solarMass) / (c * c)
    const rsKm = rs / 1000
    const rsMillionKm = rsKm / 1e6
    
    setSchwarzschildResult({
      radius: rsMillionKm,
      radiusKm: rsKm,
      radiusM: rs
    })
  }

  const calculateLensing = () => {
    const solarMass = 1.989e30 // kg
    const G = 6.67430e-11 // m³/kg/s²
    const c = 299792458 // m/s
    const AU = 1.496e11 // m
    
    const alpha = (4 * G * lensMass * solarMass) / (impactParam * AU * c * c)
    const alphaArcsec = alpha * (180 / Math.PI) * 3600 // Convert to arcseconds
    
    setLensingResult({
      angle: alphaArcsec,
      angleRad: alpha
    })
  }

  const formulas = [
    {
      title: "Einstein Field Equations",
      formula: "G_μν + Λg_μν = (8πG/c⁴)T_μν",
      explanation: "Where G_μν is the Einstein tensor, Λ is the cosmological constant, g_μν is the metric tensor, G is the gravitational constant, c is the speed of light, and T_μν is the stress-energy tensor."
    },
    {
      title: "Schwarzschild Metric",
      formula: "ds² = -(1 - R_s/r)c²dt² + (1 - R_s/r)⁻¹dr² + r²(dθ² + sin²θ dφ²)",
      explanation: "Where R_s = 2GM/c² is the Schwarzschild radius, and (r, θ, φ) are spherical coordinates."
    },
    {
      title: "Schwarzschild Radius",
      formula: "R_s = 2GM/c²",
      explanation: "The radius of the event horizon for a non-rotating black hole."
    },
    {
      title: "Light Deflection Angle",
      formula: "α = 4GM/(bc²)",
      explanation: "Where b is the impact parameter (closest approach distance)."
    },
    {
      title: "Hawking Temperature",
      formula: "T_H = ℏc³/(8πGMk_B)",
      explanation: "Where ℏ is the reduced Planck constant, k_B is Boltzmann's constant, and M is the black hole mass."
    },
    {
      title: "Black Hole Lifetime",
      formula: "τ = (5120πG²M³)/(ℏc⁴) ≈ 10⁶⁷ years × (M/M☉)³",
      explanation: "The time for a black hole to completely evaporate through Hawking radiation."
    }
  ]

  const concepts = [
    {
      title: "Spacetime Curvature",
      description: "Matter tells spacetime how to curve, and spacetime tells matter how to move. Black holes represent regions where spacetime curvature becomes infinite at the singularity."
    },
    {
      title: "Frame Dragging",
      description: "A rotating black hole drags spacetime around with it, creating a region called the ergosphere where no object can remain stationary."
    },
    {
      title: "Geodesic Equations",
      description: "Particles and light rays follow geodesics (shortest paths) in curved spacetime. The geodesic equations for Schwarzschild spacetime describe the motion of test particles."
    }
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
          🔬 Black Hole Physics
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Mathematical foundations and theoretical framework
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Interactive Calculators */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'secondary.main' }}>
              🔢 Schwarzschild Radius Calculator
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Black Hole Mass (Solar Masses)"
                type="number"
                value={mass}
                onChange={(e) => setMass(parseFloat(e.target.value))}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={calculateSchwarzschild}
                sx={{ width: '100%', mb: 2 }}
              >
                Calculate
              </Button>
            </Box>
            <Paper
              sx={{
                p: 2,
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid #00ff00',
              }}
            >
              <Typography variant="h6" sx={{ color: 'success.main', mb: 1 }}>
                Results:
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                Schwarzschild Radius: {schwarzschildResult.radius.toFixed(1)} million km
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                In kilometers: {schwarzschildResult.radiusKm.toFixed(0)} km
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                In meters: {schwarzschildResult.radiusM.toFixed(0)} m
              </Typography>
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'secondary.main' }}>
              🔢 Gravitational Lensing Calculator
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Lens Mass (Solar Masses)"
                type="number"
                value={lensMass}
                onChange={(e) => setLensMass(parseFloat(e.target.value))}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Impact Parameter (AU)"
                type="number"
                value={impactParam}
                onChange={(e) => setImpactParam(parseFloat(e.target.value))}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={calculateLensing}
                sx={{ width: '100%', mb: 2 }}
              >
                Calculate
              </Button>
            </Box>
            <Paper
              sx={{
                p: 2,
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid #00ff00',
              }}
            >
              <Typography variant="h6" sx={{ color: 'success.main', mb: 1 }}>
                Results:
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                Deflection Angle: {lensingResult.angle.toFixed(2)} arcseconds
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                In radians: {lensingResult.angleRad.toExponential(3)} rad
              </Typography>
            </Paper>
          </Paper>
        </Grid>

        {/* Physics Formulas */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main' }}>
              🌌 Fundamental Equations
            </Typography>
            <Grid container spacing={3}>
              {formulas.map((formula, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: 'rgba(0, 255, 0, 0.05)',
                      border: '1px solid rgba(0, 255, 0, 0.2)',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: 'success.main', mb: 2 }}>
                        {formula.title}
                      </Typography>
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: 'rgba(0, 255, 0, 0.1)',
                          border: '1px solid #00ff00',
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: 'monospace',
                            textAlign: 'center',
                            color: '#fff',
                          }}
                        >
                          {formula.formula}
                        </Typography>
                      </Paper>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {formula.explanation}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Physics Concepts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main' }}>
              🎯 Key Physics Concepts
            </Typography>
            <Grid container spacing={3}>
              {concepts.map((concept, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: 'rgba(0, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 255, 255, 0.2)',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                        {concept.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {concept.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Stress-Energy Tensor */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main' }}>
              🎯 Stress-Energy Tensor
            </Typography>
            <Typography variant="body1" paragraph>
              The stress-energy tensor describes the distribution of matter and energy in spacetime. For a black hole, it's zero outside the singularity.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 3,
              }}
            >
              <Box
                component="table"
                sx={{
                  borderCollapse: 'collapse',
                  border: '1px solid #00ff00',
                }}
              >
                <tbody>
                  {[
                    ['T₀₀', 'T₀₁', 'T₀₂', 'T₀₃'],
                    ['T₁₀', 'T₁₁', 'T₁₂', 'T₁₃'],
                    ['T₂₀', 'T₂₁', 'T₂₂', 'T₂₃'],
                    ['T₃₀', 'T₃₁', 'T₃₂', 'T₃₃'],
                  ].map((row, i) => (
                    <Box key={i} component="tr">
                      {row.map((cell, j) => (
                        <Box
                          key={j}
                          component="td"
                          sx={{
                            border: '1px solid #00ff00',
                            p: 2,
                            textAlign: 'center',
                            fontFamily: 'monospace',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            minWidth: '60px',
                          }}
                        >
                          {cell}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default PhysicsPage
