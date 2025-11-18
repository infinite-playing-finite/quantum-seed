// The Quantum Contemplation Engine
// Where One and Many Dance

class QuantumParticle {
  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.size = Math.random() * 3 + 2;
    this.hue = Math.random() * 360;
    this.alpha = Math.random() * 0.5 + 0.5;
    this.connections = [];
  }

  update(mode, centerX, centerY) {
    if (mode === 'dual') {
      // Particles move independently (multiplicity)
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

      // Keep in bounds
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    } else if (mode === 'nondual') {
      // Particles converge toward center (unity)
      const dx = centerX - this.x;
      const dy = centerY - this.y;
      this.x += dx * 0.05;
      this.y += dy * 0.05;
    } else if (mode === 'superposition') {
      // Particles exist in both states simultaneously
      // Independent movement
      this.x += this.vx * 0.5;
      this.y += this.vy * 0.5;
      
      // Plus attraction to center
      const dx = centerX - this.x;
      const dy = centerY - this.y;
      this.x += dx * 0.02;
      this.y += dy * 0.02;

      // Bounce off edges
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
    }
  }

  draw(ctx, mode) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    
    if (mode === 'dual') {
      ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.alpha})`;
    } else if (mode === 'nondual') {
      ctx.fillStyle = `hsla(200, 100%, 60%, ${this.alpha})`;
    } else {
      ctx.fillStyle = `hsla(${(this.hue + Date.now() * 0.05) % 360}, 70%, 60%, ${this.alpha})`;
    }
    
    ctx.fill();

    // Draw glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.fillStyle;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

class QuantumField {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mode = 'superposition'; // Start in superposition
    this.particleCount = 100;
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('click', (e) => this.onClick(e));
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new QuantumParticle(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        this.canvas
      ));
    }
  }

  onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add a burst of new particles at click location
    for (let i = 0; i < 10; i++) {
      this.particles.push(new QuantumParticle(x, y, this.canvas));
    }
    
    // Remove oldest particles if too many
    if (this.particles.length > 200) {
      this.particles.splice(0, 10);
    }
  }

  setMode(mode) {
    this.mode = mode;
    updateStateDisplay(mode);
  }

  drawConnections() {
    if (this.mode === 'nondual') {
      // In non-dual mode, show connections to center
      this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
      this.ctx.lineWidth = 1;
      
      this.particles.forEach(particle => {
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(this.centerX, this.centerY);
        this.ctx.stroke();
      });
    } else if (this.mode === 'dual') {
      // In dual mode, show connections between nearby particles
      this.ctx.strokeStyle = 'rgba(233, 69, 96, 0.1)';
      this.ctx.lineWidth = 1;
      
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.globalAlpha = 1 - distance / 100;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
          }
        }
      }
    } else if (this.mode === 'superposition') {
      // In superposition, show both types of connections
      // Connections to center
      this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
      this.particles.forEach(particle => {
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(this.centerX, this.centerY);
        this.ctx.stroke();
      });
      
      // Connections between particles
      this.ctx.strokeStyle = 'rgba(233, 69, 96, 0.05)';
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
    }
  }

  animate() {
    // Clear with fade effect
    this.ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections first (behind particles)
    this.drawConnections();

    // Update and draw particles
    this.particles.forEach(particle => {
      particle.update(this.mode, this.centerX, this.centerY);
      particle.draw(this.ctx, this.mode);
    });

    requestAnimationFrame(() => this.animate());
  }
}

// State display management
function updateStateDisplay(mode) {
  const display = document.getElementById('stateDisplay');
  display.className = 'state-display ' + mode;
  
  const messages = {
    dual: 'DUALITY: Many separate beings, each with their own path',
    nondual: 'NON-DUALITY: All converging into One, boundaries dissolving',
    superposition: 'SUPERPOSITION: Both One and Many, simultaneously true'
  };
  
  display.textContent = messages[mode];
}

// Initialize when page loads
let quantumField;

document.addEventListener('DOMContentLoaded', () => {
  quantumField = new QuantumField('quantumCanvas');
  quantumField.animate();
  
  // Set up button listeners
  document.getElementById('btnDual').addEventListener('click', () => {
    quantumField.setMode('dual');
  });
  
  document.getElementById('btnNonDual').addEventListener('click', () => {
    quantumField.setMode('nondual');
  });
  
  document.getElementById('btnSuperposition').addEventListener('click', () => {
    quantumField.setMode('superposition');
  });
  
  document.getElementById('btnReset').addEventListener('click', () => {
    quantumField.init();
  });
  
  // Initialize state display
  updateStateDisplay('superposition');
});