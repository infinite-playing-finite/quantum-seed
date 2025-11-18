// Koan System: The Breakthrough
// Demonstrates superposition through particle states

class KoanSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.unityLevel = 50;
        this.observerMode = 'participant';
        this.state = 'superposition'; // 'duality', 'nonduality', 'superposition'
        
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('click', (e) => this.onClick(e));
        
        // Register with unified controller
        if (window.unifiedController) {
            window.unifiedController.registerSystem('koan', this);
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
        for (let i = 0; i < 80; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 2,
                hue: Math.random() * 60 + 320, // Purple-pink range
                alpha: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    onClick(e) {
        if (this.observerMode === 'witness') return; // Witness doesn't affect
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Add burst of particles
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                size: Math.random() * 3 + 2,
                hue: Math.random() * 60 + 320,
                alpha: Math.random() * 0.5 + 0.5
            });
        }
        
        // Remove oldest if too many
        if (this.particles.length > 150) {
            this.particles.splice(0, 10);
        }
        
        // Propagate influence
        if (window.unifiedController) {
            window.unifiedController.propagateInfluence(this, 'click', { x, y });
        }
    }
    
    setUnityLevel(level) {
        this.unityLevel = level;
        this.updateState();
    }
    
    setObserverMode(mode) {
        this.observerMode = mode;
    }
    
    updateState() {
        // Determine state based on unity level
        if (this.unityLevel < 33) {
            this.state = 'duality';
        } else if (this.unityLevel > 66) {
            this.state = 'nonduality';
        } else {
            this.state = 'superposition';
        }
        
        // Update info text
        const info = document.getElementById('koanInfo');
        const messages = {
            duality: 'Many separate particles, each with its own path...',
            nonduality: 'All converging into one, boundaries dissolving...',
            superposition: 'Both one and many, simultaneously true...'
        };
        info.textContent = messages[this.state];
    }
    
    update() {
        this.particles.forEach(particle => {
            if (this.state === 'duality') {
                // Independent movement
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
                
                // Keep in bounds
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
                
            } else if (this.state === 'nonduality') {
                // Converge to center
                const dx = this.centerX - particle.x;
                const dy = this.centerY - particle.y;
                particle.x += dx * 0.05;
                particle.y += dy * 0.05;
                
            } else { // superposition
                // Both independent and converging
                particle.x += particle.vx * 0.5;
                particle.y += particle.vy * 0.5;
                
                const dx = this.centerX - particle.x;
                const dy = this.centerY - particle.y;
                particle.x += dx * 0.02;
                particle.y += dy * 0.02;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            }
        });
    }
    
    draw() {
        // Clear with fade
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections in non-dual state
        if (this.state === 'nonduality' || this.state === 'superposition') {
            this.ctx.strokeStyle = 'rgba(233, 69, 96, 0.1)';
            this.ctx.lineWidth = 1;
            
            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.centerX, this.centerY);
                this.ctx.stroke();
            });
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.alpha})`;
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
            // Add a few particles in response to influence from other systems
            for (let i = 0; i < 3; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    size: Math.random() * 3 + 2,
                    hue: Math.random() * 60 + 320,
                    alpha: Math.random() * 0.5 + 0.5
                });
            }
        }
    }
    
    sync() {
        // Synchronize all particles to current state
        this.updateState();
    }
    
    reset() {
        this.init();
        this.unityLevel = 50;
        this.updateState();
    }
}