// Flux System: The Flow
// Demonstrates the transition between states through wave functions

class FluxSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];
        this.unityLevel = 50;
        this.observerMode = 'participant';
        this.flowParticles = [];
        
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('click', (e) => this.onClick(e));
        
        // Register with unified controller
        if (window.unifiedController) {
            window.unifiedController.registerSystem('flux', this);
        }
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }
    
    init() {
        this.waves = [];
        this.flowParticles = [];
        
        // Create wave layers
        for (let i = 0; i < 5; i++) {
            this.waves.push({
                amplitude: 30 + i * 10,
                frequency: 0.02 + i * 0.005,
                phase: i * Math.PI / 3,
                speed: 0.02 + i * 0.01,
                hue: 270 + i * 10 // Purple range
            });
        }
        
        // Create flow particles
        for (let i = 0; i < 50; i++) {
            this.flowParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2 + 1,
                hue: 270 + Math.random() * 30,
                alpha: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    onClick(e) {
        if (this.observerMode === 'witness') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create disturbance in the field
        this.waves.forEach(wave => {
            wave.phase += Math.PI / 4;
        });
        
        // Add flow particles
        for (let i = 0; i < 5; i++) {
            this.flowParticles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                size: Math.random() * 2 + 1,
                hue: 270 + Math.random() * 30,
                alpha: Math.random() * 0.5 + 0.3
            });
        }
        
        // Propagate influence
        if (window.unifiedController) {
            window.unifiedController.propagateInfluence(this, 'click', { x, y });
        }
    }
    
    setUnityLevel(level) {
        this.unityLevel = level;
        this.updateInfo();
    }
    
    setObserverMode(mode) {
        this.observerMode = mode;
    }
    
    updateInfo() {
        const info = document.getElementById('fluxInfo');
        if (this.unityLevel < 33) {
            info.textContent = 'Waves flow independently, each with its own rhythm...';
        } else if (this.unityLevel > 66) {
            info.textContent = 'All waves merge into one coherent flow...';
        } else {
            info.textContent = 'Waves interfere, creating patterns of flow...';
        }
    }
    
    update() {
        const time = Date.now() * 0.001;
        
        // Update wave phases
        this.waves.forEach(wave => {
            wave.phase += wave.speed;
        });
        
        // Update flow particles
        this.flowParticles.forEach(particle => {
            if (this.unityLevel < 33) {
                // Independent flow
                particle.x += particle.vx;
                particle.y += particle.vy;
                
            } else if (this.unityLevel > 66) {
                // Unified flow toward center
                const dx = this.centerX - particle.x;
                const dy = this.centerY - particle.y;
                particle.x += dx * 0.02;
                particle.y += dy * 0.02;
                
            } else {
                // Superposition - both flows
                const blend = (this.unityLevel - 33) / 33;
                particle.x += particle.vx * (1 - blend) + (this.centerX - particle.x) * 0.02 * blend;
                particle.y += particle.vy * (1 - blend) + (this.centerY - particle.y) * 0.02 * blend;
            }
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
        
        // Remove excess particles
        if (this.flowParticles.length > 100) {
            this.flowParticles.splice(0, this.flowParticles.length - 100);
        }
    }
    
    draw() {
        // Clear
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw waves
        this.waves.forEach((wave, index) => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `hsla(${wave.hue}, 70%, 60%, 0.3)`;
            this.ctx.lineWidth = 2;
            
            for (let x = 0; x < this.canvas.width; x += 5) {
                const y = this.centerY + 
                    Math.sin(x * wave.frequency + wave.phase) * wave.amplitude *
                    (this.unityLevel / 100); // Amplitude affected by unity
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        });
        
        // Draw flow particles
        this.flowParticles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.alpha})`;
            this.ctx.fill();
            
            // Glow
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = this.ctx.fillStyle;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    receiveInfluence(type, data) {
        if (type === 'click' && this.observerMode !== 'witness') {
            // Create wave disturbance
            this.waves.forEach(wave => {
                wave.phase += Math.PI / 6;
            });
        }
    }
    
    sync() {
        this.updateInfo();
    }
    
    reset() {
        this.init();
        this.unityLevel = 50;
        this.updateInfo();
    }
}