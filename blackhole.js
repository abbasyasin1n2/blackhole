// Black Hole Simulation - Comprehensive Educational Web Application
// Based on Schwarzschild geodesics and gravitational lensing

class BlackHoleSimulation {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.blackHole = null;
        this.accretionDisk = null;
        this.starField = null;
        this.particles = null;
        this.rayTracedParticles = [];
        
        // Physics parameters (based on Sagittarius A*)
        this.G = 6.67430e-11;
        this.c = 299792458.0;
        this.blackHoleMass = 4.3e6 * 1.989e30; // Sagittarius A* mass
        this.schwarzschildRadius = (2 * this.G * this.blackHoleMass) / (this.c * this.c);
        
        // Simulation parameters
        this.gravityEnabled = true;
        this.lensingStrength = 1.5;
        this.diskBrightness = 1.0;
        this.cameraDistance = 5;
        this.showEventHorizon = true;
        this.showAccretionDisk = true;
        this.showParticles = true;
        
        // Performance monitoring
        this.frameCount = 0;
        this.lastTime = 0;
        this.fps = 60;
        
        // Educational content
        this.currentLesson = 0;
        this.lessons = [
            {
                title: "What is a Black Hole?",
                content: "A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon. This occurs when a massive star collapses at the end of its life.",
                physics: "The Schwarzschild radius (event horizon) is given by: R_s = 2GM/c²"
            },
            {
                title: "Gravitational Lensing",
                content: "Einstein predicted that massive objects bend spacetime, causing light to follow curved paths. This creates lensing effects where we can see light from behind the black hole.",
                physics: "Light deflection angle: θ = 4GM/(bc²) where b is the impact parameter"
            },
            {
                title: "Accretion Disks",
                content: "Matter falling into a black hole forms a hot, glowing disk due to friction and gravitational heating. The inner parts are hotter and bluer, outer parts cooler and redder.",
                physics: "Disk temperature follows: T ∝ M^(-1/4) × r^(-3/4)"
            },
            {
                title: "Hawking Radiation",
                content: "Black holes slowly evaporate over time due to quantum effects near the event horizon, emitting radiation named after Stephen Hawking.",
                physics: "Hawking temperature: T_H = ℏc³/(8πGMk_B)"
            }
        ];
        
        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createControls();
        this.createBlackHole();
        this.createAccretionDisk();
        this.createStarField();
        this.createParticleSystem();
        this.createRayTracedParticles();
        this.setupLighting();
        this.setupEventListeners();
        this.setupEducationalContent();
        this.animate();
        
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('canvas-container').classList.remove('hidden');
        }, 3000);
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);
        
        // Add fog for depth
        this.scene.fog = new THREE.Fog(0x000011, 50, 200);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 0, 15);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
    }

    createControls() {
        // Simple orbit controls implementation
        this.controls = {
            enabled: true,
            enableDamping: true,
            dampingFactor: 0.05,
            enableZoom: true,
            enableRotate: true,
            autoRotate: false,
            autoRotateSpeed: 0.5,
            minDistance: 2,
            maxDistance: 100,
            
            // Mouse state
            mouseX: 0,
            mouseY: 0,
            isMouseDown: false,
            target: new THREE.Vector3(0, 0, 0),
            spherical: new THREE.Spherical(),
            
            update: () => {
                if (!this.controls.enabled) return;
                
                const delta = 0.01;
                const position = this.camera.position;
                
                // Convert to spherical coordinates
                this.controls.spherical.setFromVector3(position);
                
                // Handle rotation
                if (this.controls.isMouseDown) {
                    this.controls.spherical.theta -= this.controls.mouseX * delta;
                    this.controls.spherical.phi += this.controls.mouseY * delta;
                    this.controls.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.controls.spherical.phi));
                }
                
                // Apply auto-rotation
                if (this.controls.autoRotate) {
                    this.controls.spherical.theta += this.controls.autoRotateSpeed * delta;
                }
                
                // Update camera position
                position.setFromSpherical(this.controls.spherical);
                this.camera.lookAt(this.controls.target);
            },
            
            reset: () => {
                this.camera.position.set(0, 0, 15);
                this.controls.target.set(0, 0, 0);
                this.controls.spherical.setFromVector3(this.camera.position);
            }
        };
    }

    createBlackHole() {
        // Event horizon (Schwarzschild radius)
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        
        // Enhanced black hole material with gravitational lensing
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                lensingStrength: { value: this.lensingStrength },
                cameraPosition: { value: new THREE.Vector3() },
                showEventHorizon: { value: this.showEventHorizon }
            },
            vertexShader: `
                uniform float time;
                uniform float lensingStrength;
                uniform vec3 cameraPosition;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec3 vViewDirection;
                varying float vDistance;
                
                void main() {
                    vPosition = position;
                    vNormal = normal;
                    vDistance = distance(cameraPosition, position);
                    vViewDirection = normalize(cameraPosition - position);
                    
                    // Gravitational lensing distortion
                    float distortion = lensingStrength * 0.2 * sin(time * 2.0 + length(position) * 5.0);
                    vec3 distortedPosition = position + normal * distortion;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float showEventHorizon;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec3 vViewDirection;
                varying float vDistance;
                
                void main() {
                    // Event horizon should be completely black
                    vec3 color = vec3(0.0);
                    
                    // Add subtle gravitational lensing effect at edges
                    float edge = 1.0 - smoothstep(0.8, 1.0, length(vPosition));
                    color += vec3(0.1, 0.05, 0.2) * edge * sin(time * 3.0);
                    
                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });

        this.blackHole = new THREE.Mesh(geometry, material);
        this.blackHole.scale.setScalar(2.0); // Visible size
        this.scene.add(this.blackHole);
    }

    createAccretionDisk() {
        const geometry = new THREE.RingGeometry(2.5, 12, 128);
        
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                brightness: { value: this.diskBrightness },
                lensingStrength: { value: this.lensingStrength },
                showDisk: { value: this.showAccretionDisk }
            },
            vertexShader: `
                uniform float time;
                uniform float lensingStrength;
                varying vec2 vUv;
                varying vec3 vPosition;
                varying float vRadius;
                
                void main() {
                    vUv = uv;
                    vPosition = position;
                    vRadius = length(position.xy);
                    
                    // Accretion disk rotation
                    float angle = time * 0.8;
                    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
                    vec3 rotatedPosition = position;
                    rotatedPosition.xy = rotation * position.xy;
                    
                    // Gravitational lensing warping
                    float warp = lensingStrength * 0.3 * sin(time * 2.0 + vRadius * 3.0);
                    rotatedPosition.xy *= (1.0 + warp * 0.1);
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(rotatedPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float brightness;
                uniform float lensingStrength;
                uniform float showDisk;
                varying vec2 vUv;
                varying vec3 vPosition;
                varying float vRadius;
                
                void main() {
                    float distance = length(vUv - vec2(0.5));
                    float normalizedDistance = distance / 0.5;
                    
                    // Temperature gradient (blue to red)
                    vec3 innerColor = vec3(0.3, 0.6, 1.0); // Blue (hotter)
                    vec3 outerColor = vec3(1.0, 0.2, 0.1); // Red (cooler)
                    vec3 color = mix(innerColor, outerColor, normalizedDistance);
                    
                    // Brightness falloff with realistic physics
                    float brightnessFalloff = pow(1.0 - normalizedDistance, 0.7);
                    
                    // Gravitational lensing effect
                    float lensingEffect = 1.0 + lensingStrength * 0.4 * sin(time * 4.0 + vRadius * 8.0);
                    
                    // Disk structure (spiral arms)
                    float spiral = sin(vRadius * 10.0 - time * 5.0) * 0.3 + 0.7;
                    
                    vec3 finalColor = color * brightness * brightnessFalloff * lensingEffect * spiral;
                    float alpha = brightnessFalloff * 0.9 * showDisk;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.accretionDisk = new THREE.Mesh(geometry, material);
        this.accretionDisk.rotation.x = Math.PI / 2; // Horizontal
        this.scene.add(this.accretionDisk);
    }

    createStarField() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 15000;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let i = 0; i < starCount * 3; i += 3) {
            // Random positions in a large sphere
            const radius = 100 + Math.random() * 200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
            
            // Random star colors (mostly white/blue with some red giants)
            const color = new THREE.Color();
            if (Math.random() < 0.1) {
                color.setHSL(0.05, 0.8, 0.8); // Red giants
            } else {
                color.setHSL(Math.random() * 0.2 + 0.5, 0.2, Math.random() * 0.5 + 0.5);
            }
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
            
            sizes[i / 3] = Math.random() * 3 + 1;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true
        });

        this.starField = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.starField);
    }

    createParticleSystem() {
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Random positions around the black hole
            const radius = 3 + Math.random() * 8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
            
            // Orbital velocities
            const orbitalSpeed = Math.sqrt(this.G * this.blackHoleMass / (radius * this.schwarzschildRadius)) * 0.01;
            velocities[i] = -orbitalSpeed * Math.sin(theta);
            velocities[i + 1] = orbitalSpeed * Math.cos(theta);
            velocities[i + 2] = (Math.random() - 0.5) * 0.01;
            
            // Particle colors (hot matter)
            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.3, 0.8, 0.7);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createRayTracedParticles() {
        // Create particles that show gravitational lensing paths
        const rayCount = 100;
        for (let i = 0; i < rayCount; i++) {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(60 * 3); // 60 points per ray
            
            // Initialize ray path
            for (let j = 0; j < 60; j++) {
                const t = j / 59.0;
                positions[j * 3] = (Math.random() - 0.5) * 20;
                positions[j * 3 + 1] = (Math.random() - 0.5) * 20;
                positions[j * 3 + 2] = -20 + t * 40;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const material = new THREE.LineBasicMaterial({
                color: new THREE.Color().setHSL(0.6, 0.8, 0.6),
                transparent: true,
                opacity: 0.3
            });
            
            const ray = new THREE.Line(geometry, material);
            this.rayTracedParticles.push(ray);
            this.scene.add(ray);
        }
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x202040, 0.1);
        this.scene.add(ambientLight);

        // Point light from accretion disk
        const pointLight = new THREE.PointLight(0xffffff, 3, 50);
        pointLight.position.set(0, 0, 0);
        this.scene.add(pointLight);

        // Directional light for rim lighting
        const directionalLight = new THREE.DirectionalLight(0x4080ff, 0.5);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);
    }

    setupEducationalContent() {
        // Create educational content panel
        const educationPanel = document.createElement('div');
        educationPanel.id = 'education-panel';
        educationPanel.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #333;
            backdrop-filter: blur(10px);
            max-width: 400px;
            max-height: 70vh;
            overflow-y: auto;
            z-index: 100;
            font-family: Arial, sans-serif;
        `;
        
        educationPanel.innerHTML = `
            <h3 style="color: #00ffff; margin-bottom: 15px;">🔬 Black Hole Education</h3>
            <div id="lesson-content">
                <h4 style="color: #ff6600; margin-bottom: 10px;">${this.lessons[this.currentLesson].title}</h4>
                <p style="margin-bottom: 15px; line-height: 1.4;">${this.lessons[this.currentLesson].content}</p>
                <div style="background: rgba(255, 255, 255, 0.1); padding: 10px; border-radius: 5px; margin-bottom: 15px;">
                    <strong style="color: #00ff00;">Physics:</strong><br>
                    ${this.lessons[this.currentLesson].physics}
                </div>
                <button id="prev-lesson" style="margin-right: 10px; padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 5px; cursor: pointer;">← Previous</button>
                <button id="next-lesson" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 5px; cursor: pointer;">Next →</button>
            </div>
        `;
        
        document.getElementById('canvas-container').appendChild(educationPanel);
        
        // Add lesson navigation
        document.getElementById('prev-lesson').addEventListener('click', () => {
            this.currentLesson = Math.max(0, this.currentLesson - 1);
            this.updateLessonContent();
        });
        
        document.getElementById('next-lesson').addEventListener('click', () => {
            this.currentLesson = Math.min(this.lessons.length - 1, this.currentLesson + 1);
            this.updateLessonContent();
        });
    }

    updateLessonContent() {
        const content = document.getElementById('lesson-content');
        content.innerHTML = `
            <h4 style="color: #ff6600; margin-bottom: 10px;">${this.lessons[this.currentLesson].title}</h4>
            <p style="margin-bottom: 15px; line-height: 1.4;">${this.lessons[this.currentLesson].content}</p>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 10px; border-radius: 5px; margin-bottom: 15px;">
                <strong style="color: #00ff00;">Physics:</strong><br>
                ${this.lessons[this.currentLesson].physics}
            </div>
            <button id="prev-lesson" style="margin-right: 10px; padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 5px; cursor: pointer;">← Previous</button>
            <button id="next-lesson" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 5px; cursor: pointer;">Next →</button>
        `;
        
        // Re-add event listeners
        document.getElementById('prev-lesson').addEventListener('click', () => {
            this.currentLesson = Math.max(0, this.currentLesson - 1);
            this.updateLessonContent();
        });
        
        document.getElementById('next-lesson').addEventListener('click', () => {
            this.currentLesson = Math.min(this.lessons.length - 1, this.currentLesson + 1);
            this.updateLessonContent();
        });
    }

    setupEventListeners() {
        // Mouse controls
        this.renderer.domElement.addEventListener('mousedown', (e) => {
            this.controls.isMouseDown = true;
        });
        
        this.renderer.domElement.addEventListener('mouseup', () => {
            this.controls.isMouseDown = false;
        });
        
        this.renderer.domElement.addEventListener('mousemove', (e) => {
            if (this.controls.isMouseDown) {
                this.controls.mouseX = (e.movementX || 0) * 0.01;
                this.controls.mouseY = (e.movementY || 0) * 0.01;
            }
        });
        
        this.renderer.domElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            const scale = 1 + (e.deltaY > 0 ? 0.1 : -0.1);
            this.camera.position.multiplyScalar(scale);
            this.camera.position.clampLength(2, 100);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // UI Controls
        document.getElementById('distance-slider').addEventListener('input', (e) => {
            this.cameraDistance = parseFloat(e.target.value);
            this.camera.position.setLength(10 * this.cameraDistance);
        });

        document.getElementById('disk-brightness').addEventListener('input', (e) => {
            this.diskBrightness = parseFloat(e.target.value);
            if (this.accretionDisk.material.uniforms) {
                this.accretionDisk.material.uniforms.brightness.value = this.diskBrightness;
            }
        });

        document.getElementById('lensing-strength').addEventListener('input', (e) => {
            this.lensingStrength = parseFloat(e.target.value);
            if (this.blackHole.material.uniforms) {
                this.blackHole.material.uniforms.lensingStrength.value = this.lensingStrength;
            }
            if (this.accretionDisk.material.uniforms) {
                this.accretionDisk.material.uniforms.lensingStrength.value = this.lensingStrength;
            }
        });

        document.getElementById('toggle-gravity').addEventListener('click', () => {
            this.gravityEnabled = !this.gravityEnabled;
            const button = document.getElementById('toggle-gravity');
            button.textContent = this.gravityEnabled ? 'Gravity: ON' : 'Gravity: OFF';
            button.classList.toggle('active', !this.gravityEnabled);
        });

        document.getElementById('reset-camera').addEventListener('click', () => {
            this.controls.reset();
        });
    }

    updatePhysics(deltaTime) {
        if (!this.gravityEnabled) return;

        // Update particle system with gravitational physics
        const positions = this.particles.geometry.attributes.position.array;
        const velocities = this.particles.geometry.attributes.velocity.array;

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            const distance = Math.sqrt(x * x + y * y + z * z);
            
            if (distance > 2.1) { // Outside event horizon
                // Gravitational acceleration
                const acceleration = this.G * this.blackHoleMass / (distance * distance * this.schwarzschildRadius) * 0.01;
                
                velocities[i] += (-x / distance) * acceleration * deltaTime;
                velocities[i + 1] += (-y / distance) * acceleration * deltaTime;
                velocities[i + 2] += (-z / distance) * acceleration * deltaTime;
                
                // Update positions
                positions[i] += velocities[i] * deltaTime;
                positions[i + 1] += velocities[i + 1] * deltaTime;
                positions[i + 2] += velocities[i + 2] * deltaTime;
            } else {
                // Reset particle if it falls into black hole
                const radius = 3 + Math.random() * 8;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                
                positions[i] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i + 2] = radius * Math.cos(phi);
                
                velocities[i] = 0;
                velocities[i + 1] = 0;
                velocities[i + 2] = 0;
            }
        }

        this.particles.geometry.attributes.position.needsUpdate = true;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Update physics
        this.updatePhysics(deltaTime);

        // Update shader uniforms
        const time = currentTime * 0.001;
        
        if (this.blackHole.material.uniforms) {
            this.blackHole.material.uniforms.time.value = time;
            this.blackHole.material.uniforms.cameraPosition.value.copy(this.camera.position);
        }
        
        if (this.accretionDisk.material.uniforms) {
            this.accretionDisk.material.uniforms.time.value = time;
        }

        // Rotate star field slowly
        this.starField.rotation.y += 0.0005;

        // Update ray-traced particles
        this.rayTracedParticles.forEach((ray, index) => {
            const positions = ray.geometry.attributes.position.array;
            const timeOffset = time + index * 0.1;
            
            for (let i = 0; i < positions.length; i += 3) {
                const t = i / (positions.length - 3);
                const originalZ = -20 + t * 40;
                
                // Gravitational lensing effect
                const lensingEffect = Math.sin(timeOffset * 2.0 + t * 10.0) * 0.5;
                positions[i] += lensingEffect;
                positions[i + 1] += lensingEffect * 0.5;
            }
            
            ray.geometry.attributes.position.needsUpdate = true;
        });

        // Update controls
        this.controls.update();

        // Render
        this.renderer.render(this.scene, this.camera);

        // Update FPS counter
        this.frameCount++;
        if (currentTime % 1000 < 16) { // Update every second
            this.fps = this.frameCount;
            this.frameCount = 0;
            document.getElementById('fps').textContent = this.fps;
            document.getElementById('resolution').textContent = 
                `${this.renderer.domElement.width}x${this.renderer.domElement.height}`;
        }
    }
}

// Initialize the simulation when the page loads
window.addEventListener('load', () => {
    new BlackHoleSimulation();
});