import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SimulationPage from './pages/SimulationPage'
import AboutPage from './pages/AboutPage'
import PhysicsPage from './pages/PhysicsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SimulationPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="physics" element={<PhysicsPage />} />
      </Route>
    </Routes>
  )
}

export default App
