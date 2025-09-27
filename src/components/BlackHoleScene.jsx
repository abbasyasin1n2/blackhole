import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sphere, Ring } from '@react-three/drei'
import * as THREE from 'three'

const BlackHoleScene = ({ gravityEnabled, onFPSUpdate }) => {
  const { camera } = useThree()
  const blackHoleRef = useRef()
  const diskRef = useRef()
  const particlesRef = useRef()
  const starFieldRef = useRef()
  
  const [particles, setParticles] = useState([])
  const [frameCount, setFrameCount] = useState(0)
  const [lastTime, setLastTime] = useState(0)

  // Physics parameters (based on Sagittarius A*)
  const G = 6.67430e-11
  const c = 299792458.0
  const blackHoleMass = 4.3e6 * 1.989e30
  const schwarzschildRadius = (2 * G * blackHoleMass) / (c * c)

  // Initialize particles
  useEffect(() => {
    const initialParticles = []
    for (let i = 0; i < 1000; i++) {
      const radius = 3 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      initialParticles.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ],
        velocity: [
          -Math.sin(theta) * 0.01,
          Math.cos(theta) * 0.01,
          (Math.random() - 0.5) * 0.01
        ],
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.3, 0.8, 0.7)
      })
    }
    setParticles(initialParticles)
  }, [])

  // Initialize star field
  useEffect(() => {
    if (starFieldRef.current) {
      const starGeometry = new THREE.BufferGeometry()
      const starCount = 10000
      const positions = new Float32Array(starCount * 3)
      const colors = new Float32Array(starCount * 3)

      for (let i = 0; i < starCount * 3; i += 3) {
        const radius = 100 + Math.random() * 200
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i + 2] = radius * Math.cos(phi)
        
        const color = new THREE.Color()
        color.setHSL(Math.random() * 0.2 + 0.5, 0.2, Math.random() * 0.5 + 0.5)
        colors[i] = color.r
        colors[i + 1] = color.g
        colors[i + 2] = color.b
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const starMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
      })

      starFieldRef.current.geometry = starGeometry
      starFieldRef.current.material = starMaterial
    }
  }, [])

  // Animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    // Update black hole rotation
    if (blackHoleRef.current) {
      blackHoleRef.current.rotation.y = time * 0.1
    }

    // Update accretion disk rotation
    if (diskRef.current) {
      diskRef.current.rotation.y = time * 0.5
    }

    // Update particles with gravitational physics
    if (gravityEnabled && particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      const velocities = particlesRef.current.geometry.attributes.velocity.array

      for (let i = 0; i < particles.length; i++) {
        const idx = i * 3
        const x = positions[idx]
        const y = positions[idx + 1]
        const z = positions[idx + 2]
        
        const distance = Math.sqrt(x * x + y * y + z * z)
        
        if (distance > 2.1) {
          const acceleration = G * blackHoleMass / (distance * distance * schwarzschildRadius) * 0.01
          
          velocities[idx] += (-x / distance) * acceleration * delta
          velocities[idx + 1] += (-y / distance) * acceleration * delta
          velocities[idx + 2] += (-z / distance) * acceleration * delta
          
          positions[idx] += velocities[idx] * delta
          positions[idx + 1] += velocities[idx + 1] * delta
          positions[idx + 2] += velocities[idx + 2] * delta
        } else {
          // Reset particle
          const radius = 3 + Math.random() * 8
          const theta = Math.random() * Math.PI * 2
          const phi = Math.random() * Math.PI
          
          positions[idx] = radius * Math.sin(phi) * Math.cos(theta)
          positions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[idx + 2] = radius * Math.cos(phi)
          
          velocities[idx] = 0
          velocities[idx + 1] = 0
          velocities[idx + 2] = 0
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Rotate star field
    if (starFieldRef.current) {
      starFieldRef.current.rotation.y += 0.0005
    }

    // Update FPS counter
    setFrameCount(prev => prev + 1)
    if (time - lastTime >= 1.0) {
      const fps = frameCount / (time - lastTime)
      onFPSUpdate(fps)
      setFrameCount(0)
      setLastTime(time)
    }
  })

  return (
    <>
      {/* Star Field */}
      <points ref={starFieldRef} />
      
      {/* Black Hole Event Horizon */}
      <Sphere ref={blackHoleRef} args={[2, 64, 64]}>
        <meshBasicMaterial color="black" />
      </Sphere>

      {/* Accretion Disk */}
      <Ring ref={diskRef} args={[2.5, 12, 128]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color="#ff6600" 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Particle System */}
      {particles.length > 0 && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length}
              array={new Float32Array(particles.flatMap(p => p.position))}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-velocity"
              count={particles.length}
              array={new Float32Array(particles.flatMap(p => p.velocity))}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particles.length}
              array={new Float32Array(particles.flatMap(p => [p.color.r, p.color.g, p.color.b]))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial 
            size={0.15} 
            vertexColors 
            transparent 
            opacity={0.8}
            sizeAttenuation={true}
          />
        </points>
      )}

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#4080ff" />
    </>
  )
}

export default BlackHoleScene
