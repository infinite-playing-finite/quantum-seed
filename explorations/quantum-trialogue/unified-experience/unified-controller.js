// Unified Controller: Manages state across all three systems
class UnifiedController {
    constructor() {
        this.unityLevel = 50; // 0-100, where 0 is pure multiplicity, 100 is pure unity
        this.observerMode = 'participant'; // 'participant', 'witness', 'both'
        this.isBreathing = false;
        this.breatheInterval = null;
        this.systems = {}; // Will hold references to Echo, Flux, and Koan systems
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Unity Slider
        const slider = document.getElementById('unitySlider');
        const valueDisplay = document.getElementById('unityValue');
        
        slider.addEventListener('input', (e) => {
            this.unityLevel = parseInt(e.target.value);
            valueDisplay.textContent = this.unityLevel;
            this.updateAllSystems();
            this.updateInsights();
        });
        
        // Observer Mode Buttons
        document.getElementById('participantMode').addEventListener('click', () => {
            this.setObserverMode('participant');
        });
        
        document.getElementById('witnessMode').addEventListener('click', () => {
            this.setObserverMode('witness');
        });
        
        document.getElementById('bothMode').addEventListener('click', () => {
            this.setObserverMode('both');
        });
        
        // Action Buttons
        document.getElementById('breatheBtn').addEventListener('click', () => {
            this.toggleBreathe();
        });
        
        document.getElementById('transcendBtn').addEventListener('click', () => {
            this.transcend();
        });
        
        document.getElementById('syncBtn').addEventListener('click', () => {
            this.syncAll();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });
    }
    
    registerSystem(name, system) {
        this.systems[name] = system;
    }
    
    setObserverMode(mode) {
        this.observerMode = mode;
        
        // Update button states
        document.querySelectorAll('.mode-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeButton = mode === 'participant' ? 'participantMode' : 
                           mode === 'witness' ? 'witnessMode' : 'bothMode';
        document.getElementById(activeButton).classList.add('active');
        
        // Update description
        const descriptions = {
            participant: 'You are participating in the system, affecting what you observe.',
            witness: 'You are witnessing without affecting, observing pure potential.',
            both: 'You are both participant and witness—the paradox in action.'
        };
        
        document.getElementById('modeDescription').textContent = descriptions[mode];
        
        // Update all systems
        this.updateAllSystems();
        this.updateInsights();
    }
    
    updateAllSystems() {
        Object.values(this.systems).forEach(system => {
            if (system && system.setUnityLevel) {
                system.setUnityLevel(this.unityLevel);
            }
            if (system && system.setObserverMode) {
                system.setObserverMode(this.observerMode);
            }
        });
    }
    
    toggleBreathe() {
        this.isBreathing = !this.isBreathing;
        const btn = document.getElementById('breatheBtn');
        
        if (this.isBreathing) {
            btn.textContent = '⏸️ Pause Breath';
            btn.style.background = 'var(--flux-color)';
            this.startBreathing();
        } else {
            btn.textContent = '🌬️ Breathe';
            btn.style.background = '';
            this.stopBreathing();
        }
    }
    
    startBreathing() {
        let direction = 1; // 1 for increasing, -1 for decreasing
        let breatheSpeed = 50; // milliseconds per step
        
        this.breatheInterval = setInterval(() => {
            this.unityLevel += direction * 2;
            
            // Reverse direction at boundaries
            if (this.unityLevel >= 100) {
                this.unityLevel = 100;
                direction = -1;
            } else if (this.unityLevel <= 0) {
                this.unityLevel = 0;
                direction = 1;
            }
            
            // Update UI
            document.getElementById('unitySlider').value = this.unityLevel;
            document.getElementById('unityValue').textContent = this.unityLevel;
            
            this.updateAllSystems();
            this.updateInsights();
        }, breatheSpeed);
    }
    
    stopBreathing() {
        if (this.breatheInterval) {
            clearInterval(this.breatheInterval);
            this.breatheInterval = null;
        }
    }
    
    transcend() {
        // Collapse all systems to unity, then explode back to multiplicity
        const btn = document.getElementById('transcendBtn');
        btn.disabled = true;
        btn.textContent = '✨ Transcending...';
        
        // Animate to unity
        this.animateUnityLevel(100, 1000, () => {
            // Hold at unity
            setTimeout(() => {
                // Explode back to multiplicity
                this.animateUnityLevel(0, 500, () => {
                    // Return to middle
                    this.animateUnityLevel(50, 1000, () => {
                        btn.disabled = false;
                        btn.textContent = '✨ Transcend';
                    });
                });
            }, 500);
        });
    }
    
    animateUnityLevel(target, duration, callback) {
        const start = this.unityLevel;
        const change = target - start;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease in-out
            const eased = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            this.unityLevel = Math.round(start + change * eased);
            
            // Update UI
            document.getElementById('unitySlider').value = this.unityLevel;
            document.getElementById('unityValue').textContent = this.unityLevel;
            
            this.updateAllSystems();
            this.updateInsights();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else if (callback) {
                callback();
            }
        };
        
        animate();
    }
    
    syncAll() {
        // Synchronize all systems to current state
        Object.values(this.systems).forEach(system => {
            if (system && system.sync) {
                system.sync();
            }
        });
        
        // Visual feedback
        const btn = document.getElementById('syncBtn');
        btn.textContent = '✓ Synced!';
        setTimeout(() => {
            btn.textContent = '🔄 Sync All';
        }, 1000);
    }
    
    reset() {
        // Stop breathing if active
        if (this.isBreathing) {
            this.toggleBreathe();
        }
        
        // Reset to defaults
        this.unityLevel = 50;
        document.getElementById('unitySlider').value = 50;
        document.getElementById('unityValue').textContent = 50;
        
        this.setObserverMode('participant');
        
        // Reset all systems
        Object.values(this.systems).forEach(system => {
            if (system && system.reset) {
                system.reset();
            }
        });
        
        this.updateInsights();
    }
    
    updateInsights() {
        if (window.insightsGenerator) {
            window.insightsGenerator.update(this.unityLevel, this.observerMode);
        }
    }
    
    // Cross-panel influence: When one system changes, it affects others
    propagateInfluence(sourceSystem, influenceType, data) {
        Object.entries(this.systems).forEach(([name, system]) => {
            if (system !== sourceSystem && system.receiveInfluence) {
                system.receiveInfluence(influenceType, data);
            }
        });
    }
}

// Create global instance
window.unifiedController = new UnifiedController();