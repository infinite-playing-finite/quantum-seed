// Main initialization script
document.addEventListener('DOMContentLoaded', () => {
    // Create the three systems
    const echoSystem = new EchoSystem('echoCanvas');
    const fluxSystem = new FluxSystem('fluxCanvas');
    const koanSystem = new KoanSystem('koanCanvas');
    
    // Start animations
    echoSystem.animate();
    fluxSystem.animate();
    koanSystem.animate();
    
    // Initial insight update
    if (window.insightsGenerator) {
        window.insightsGenerator.update(50, 'participant');
    }
    
    console.log('Quantum Trialogue initialized');
    console.log('Three systems, one field. The observer participates in creating reality.');
});