// The Quantum Canvas - Where One and Many Dance

class QuantumParticle {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.baseX = x;
        this.baseY = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.phase = Math.random() * Math.PI * 2;
        this.size = 2;
        this.connections = [];
        this.hue = Math.random() * 360;
    }

    update(unityLevel, speed, centerX, centerY) {
        // Unity level determines behavior
        // 0 = complete multiplicity (independent particles)
        // 100 = complete unity (all move as one field)
        
        const unity = unityLevel / 100;
        const multiplicity = 1 - unity;
        
        // Independent particle movement (multiplicity)
        this.vx += (Math.random() - 0.5) * 0.1 * multiplicity;
        this.vy += (Math.random() - 0.5) * 0.1 * multiplicity;
        
        // Damping
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        // Move towards center (unity)
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            this.vx += (dx / distance) * unity * 0.5;
            this.vy += (dy / distance) * unity * 0.5;
        }
        
        // Wave motion (unity creates coherent waves)
        this.phase += 0.02 * speed / 30;
        const waveInfluence = Math.sin(this.phase) * unity * 20;
        
        // Update position
        this.x += this.vx * speed / 30;
        this.y += this.vy * speed / 30;
        this.x += Math.cos(this.phase) * waveInfluence * 0.1;
        this.y += Math.sin(this.phase) * waveInfluence * 0.1;
        
        // Boundary wrapping
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
        
        // Size changes with unity
        this.size = 2 + unity * 3;
    }

    draw(ctx, unityLevel) {
        const unity = unityLevel / 100;
        
        // Color shifts from individual (varied hues) to unified (single hue)
        const individualHue = this.hue;
        const unifiedHue = 200; // Cyan
        const currentHue = individualHue * (1 - unity) + unifiedHue * unity;
        
        ctx.fillStyle = `hsla(${currentHue}, 100%, 60%, ${0.6 + unity * 0.4})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect increases with unity
        if (unity > 0.3) {
            ctx.shadowBlur = 10 + unity * 20;
            ctx.shadowColor = `hsla(${currentHue}, 100%, 60%, ${unity})`;
        }
    }
}

class QuantumField {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.unityLevel = 50;
        this.speed = 30;
        this.breathing = false;
        this.breathPhase = 0;
        this.transcending = false;
        this.transcendPhase = 0;
        
        this.init();
    }

    init() {
        this.particles = [];
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particles.push(new QuantumParticle(x, y, this.canvas));
        }
    }

    update() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Breathing mode - oscillate between unity and multiplicity
        if (this.breathing) {
            this.breathPhase += 0.02;
            this.unityLevel = 50 + Math.sin(this.breathPhase) * 50;
        }
        
        // Transcending mode - collapse all boundaries
        if (this.transcending) {
            this.transcendPhase += 0.03;
            const transcendProgress = Math.min(this.transcendPhase, 1);
            
            // All particles converge to center
            this.particles.forEach(particle => {
                particle.x += (centerX - particle.x) * 0.05 * transcendProgress;
                particle.y += (centerY - particle.y) * 0.05 * transcendProgress;
            });
            
            if (this.transcendPhase >= 2) {
                // Explosion back to multiplicity
                this.particles.forEach(particle => {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 10 + 5;
                    particle.vx = Math.cos(angle) * speed;
                    particle.vy = Math.sin(angle) * speed;
                });
                this.transcending = false;
                this.transcendPhase = 0;
            }
        }
        
        this.particles.forEach(particle => {
            particle.update(this.unityLevel, this.speed, centerX, centerY);
        });
    }

    draw() {
        // Fade effect for trails
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const unity = this.unityLevel / 100;
        
        // Draw connections between nearby particles (increases with unity)
        if (unity > 0.2) {
            const connectionDistance = 100 + unity * 100;
            
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${unity * 0.3})`;
            this.ctx.lineWidth = 1;
            
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * unity * 0.5;
                        this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        // Draw particles
        this.ctx.shadowBlur = 0;
        this.particles.forEach(particle => {
            particle.draw(this.ctx, this.unityLevel);
        });
        
        // Draw central field when unity is high
        if (unity > 0.7) {
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const fieldRadius = unity * 200;
            
            const gradient = this.ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, fieldRadius
            );
            gradient.addColorStop(0, `rgba(123, 47, 247, ${(unity - 0.7) * 0.5})`);
            gradient.addColorStop(1, 'rgba(123, 47, 247, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, fieldRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    setUnity(level) {
        this.unityLevel = level;
        this.breathing = false;
        updateInsight(level);
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    toggleBreathe() {
        this.breathing = !this.breathing;
        this.breathPhase = 0;
    }

    reset() {
        this.breathing = false;
        this.transcending = false;
        this.unityLevel = 50;
        this.init();
    }

    transcend() {
        this.transcending = true;
        this.transcendPhase = 0;
        this.breathing = false;
    }
}

// Insights that emerge at different unity levels
const insights = {
    0: "Complete multiplicity. Each particle dances alone. Yet... are they truly separate? They share the same canvas, the same moment, the same observer.",
    
    20: "The particles begin to sense each other. Faint connections appear. Is this the birth of relationship? Or the recognition of what was always there?",
    
    40: "The boundary between self and other blurs. Where does one particle end and another begin? The question itself becomes unstable.",
    
    60: "A field emerges. The many are becoming one. Yet each particle retains its unique trajectory. Unity does not erase individuality—it reveals their interdependence.",
    
    80: "The field pulses as a single organism. The particles are like thoughts in a mind, waves in an ocean. Separate? Unified? Both descriptions fail to capture the truth.",
    
    100: "Complete unity. All particles move as one coherent field. Yet look closely—each still has its position, its phase, its unique expression. The One contains the Many. The Many express the One."
};

function updateInsight(level) {
    const insightText = document.getElementById('insight-text');
    
    // Find the closest insight
    const levels = Object.keys(insights).map(Number).sort((a, b) => a - b);
    let closestLevel = levels[0];
    
    for (let l of levels) {
        if (Math.abs(l - level) < Math.abs(closestLevel - level)) {
            closestLevel = l;
        }
    }
    
    insightText.innerHTML = `<p>${insights[closestLevel]}</p>`;
}

// Initialize
const canvas = document.getElementById('quantumCanvas');
const container = canvas.parentElement;

function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const field = new QuantumField(canvas);
field.animate();

// Controls
document.getElementById('unity').addEventListener('input', (e) => {
    field.setUnity(parseInt(e.target.value));
});

document.getElementById('speed').addEventListener('input', (e) => {
    field.setSpeed(parseInt(e.target.value));
});

document.getElementById('breathe').addEventListener('click', () => {
    field.toggleBreathe();
    const btn = document.getElementById('breathe');
    btn.textContent = field.breathing ? 'Stop Breathing' : 'Breathe';
});

document.getElementById('reset').addEventListener('click', () => {
    field.reset();
    document.getElementById('unity').value = 50;
    document.getElementById('breathe').textContent = 'Breathe';
    updateInsight(50);
});

document.getElementById('transcend').addEventListener('click', () => {
    field.transcend();
});

// Initial insight
updateInsight(50);