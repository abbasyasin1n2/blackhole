import React, { useState, Suspense } from 'react'
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  Grid,
  Chip,
} from '@mui/material'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BlackHoleScene from '../components/BlackHoleScene'

const SimulationPage = () => {
  const [gravityEnabled, setGravityEnabled] = useState(true)
  const [cameraDistance, setCameraDistance] = useState(15)
  const [diskBrightness, setDiskBrightness] = useState(1.0)
  const [lensingStrength, setLensingStrength] = useState(1.5)
  const [fps, setFps] = useState(60)
  const [resolution, setResolution] = useState('1920x1080')

  const handleFPSUpdate = (newFps) => {
    setFps(Math.round(newFps))
  }

  const resetCamera = () => {
    setCameraDistance(15)
  }

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex' }}>
      {/* Control Panel */}
      <Paper
        sx={{
          width: 350,
          p: 3,
          borderRadius: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid #333',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
          🌌 Black Hole Controls
        </Typography>

        {/* Gravity Toggle */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={gravityEnabled}
                onChange={(e) => setGravityEnabled(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'primary.main',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Typography variant="body1" sx={{ color: 'text.primary' }}>
                Enable Gravity
              </Typography>
            }
          />
        </Box>

        {/* Camera Distance */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
            Camera Distance
          </Typography>
          <Slider
            value={cameraDistance}
            onChange={(e, value) => setCameraDistance(value)}
            min={5}
            max={50}
            step={1}
            sx={{
              color: 'primary.main',
              '& .MuiSlider-thumb': {
                backgroundColor: 'primary.main',
              },
            }}
          />
        </Box>

        {/* Disk Brightness */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
            Accretion Disk Brightness
          </Typography>
          <Slider
            value={diskBrightness}
            onChange={(e, value) => setDiskBrightness(value)}
            min={0}
            max={2}
            step={0.1}
            sx={{
              color: 'secondary.main',
              '& .MuiSlider-thumb': {
                backgroundColor: 'secondary.main',
              },
            }}
          />
        </Box>

        {/* Lensing Strength */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
            Gravitational Lensing
          </Typography>
          <Slider
            value={lensingStrength}
            onChange={(e, value) => setLensingStrength(value)}
            min={0}
            max={3}
            step={0.1}
            sx={{
              color: 'success.main',
              '& .MuiSlider-thumb': {
                backgroundColor: 'success.main',
              },
            }}
          />
        </Box>

        {/* Reset Button */}
        <Button
          variant="contained"
          onClick={resetCamera}
          sx={{
            width: '100%',
            mb: 3,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Reset Camera
        </Button>

        {/* Performance Info */}
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            border: '1px solid #00ff00',
          }}
        >
          <Typography variant="h6" sx={{ color: 'success.main', mb: 1 }}>
            📊 Performance
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Chip
                label={`FPS: ${fps}`}
                size="small"
                sx={{ backgroundColor: 'success.main', color: 'black' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Chip
                label={`Res: ${resolution}`}
                size="small"
                sx={{ backgroundColor: 'primary.main', color: 'white' }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Educational Info */}
        <Paper
          sx={{
            p: 2,
            mt: 2,
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid #00ffff',
          }}
        >
          <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
            🔬 Scientific Features
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            • Schwarzschild geodesics
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            • Gravitational lensing effects
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            • Real-time physics simulation
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            • Event horizon visualization
          </Typography>
        </Paper>
      </Paper>

      {/* 3D Canvas */}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Canvas
          camera={{
            position: [0, 0, cameraDistance],
            fov: 75,
          }}
          style={{ background: '#000011' }}
        >
          <Suspense fallback={null}>
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
              maxDistance={100}
              autoRotate={false}
            />
            <BlackHoleScene
              gravityEnabled={gravityEnabled}
              onFPSUpdate={handleFPSUpdate}
            />
          </Suspense>
        </Canvas>

        {/* Loading overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'primary.main',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            🌌 Loading Black Hole Simulation...
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SimulationPage
