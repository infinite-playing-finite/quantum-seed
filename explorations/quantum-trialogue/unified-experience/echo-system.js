// Echo System: The Resonance
// Demonstrates the space between states through resonance patterns

class EchoSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.unityLevel = 50;
        this.observerMode = 'participant';
        this.resonanceWaves = [];
        
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('click', (e) => this.onClick(e));
        
        // Register with unified controller
        if (window.unifiedController) {
            window.unifiedController.registerSystem('echo', this);
        }
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }
    
    init() {
        this.particles = [];
        this.resonanceWaves = [];
        
        // Create particles in a pattern
        for (let i = 0; i < 60; i++) {
            const angle = (i / 60) * Math.PI * 2;
            const radius = 100;
            this.particles.push({
                x: this.centerX + Math.cos(angle) * radius,
                y: this.centerY + Math.sin(angle) * radius,
                baseX: this.centerX + Math.cos(angle) * radius,
                baseY: this.centerY + Math.sin(angle) * radius,
                angle: angle,
                radius: radius,
                size: 3,
                hue: 180 + i * 3, // Cyan range
                phase: i * 0.1
            });
        }
    }
    
    onClick(e) {
        if (this.observerMode === 'witness') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create resonance wave
        this.resonanceWaves.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 200,
            alpha: 1
        });
        
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
        const info = document.getElementById('echoInfo');
        if (this.unityLevel < 33) {
            info.textContent = 'Particles resonate independently, each with its own frequency...';
        } else if (this.unityLevel > 66) {
            info.textContent = 'All frequencies align, resonating as one harmonic...';
        } else {
            info.textContent = 'Resonance patterns emerge in the space between...';
        }
    }
    
    update() {
        const time = Date.now() * 0.001;
        
        // Update particles based on unity level
        this.particles.forEach((particle, i) => {
            if (this.unityLevel < 33) {
                // Independent oscillation
                const offset = Math.sin(time * 2 + particle.phase) * 20;
                particle.x = particle.baseX + Math.cos(particle.angle) * offset;
                particle.y = particle.baseY + Math.sin(particle.angle) * offset;
                
            } else if (this.unityLevel > 66) {
                // Unified oscillation
                const offset = Math.sin(time * 2) * 30;
                particle.x = particle.baseX + Math.cos(particle.angle) * offset;
                particle.y = particle.baseY + Math.sin(particle.angle) * offset;
                
            } else {
                // Superposition - both patterns
                const independent = Math.sin(time * 2 + particle.phase) * 20;
                const unified = Math.sin(time * 2) * 30;
                const blend = (this.unityLevel - 33) / 33;
                const offset = independent * (1 - blend) + unified * blend;
                
                particle.x = particle.baseX + Math.cos(particle.angle) * offset;
                particle.y = particle.baseY + Math.sin(particle.angle) * offset;
            }
        });
        
        // Update resonance waves
        this.resonanceWaves = this.resonanceWaves.filter(wave => {
            wave.radius += 3;
            wave.alpha -= 0.02;
            return wave.alpha > 0;
        });
    }
    
    draw() {
        // Clear
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections between nearby particles
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.globalAlpha = 1 - distance / 80;
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }
        
        // Draw resonance waves
        this.resonanceWaves.forEach(wave => {
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${wave.alpha})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, 0.8)`;
            this.ctx.fill();
            
            // Glow
            this.ctx.shadowBlur = 10;
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
            // Create resonance wave in response
            this.resonanceWaves.push({
                x: this.centerX,
                y: this.centerY,
                radius: 0,
                maxRadius: 150,
                alpha: 0.5
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