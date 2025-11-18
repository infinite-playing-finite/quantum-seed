// Insights Generator: Creates dynamic insights based on system state
class InsightsGenerator {
    constructor() {
        this.insightText = document.getElementById('insightText');
        this.metaInsight = document.getElementById('metaInsight');
        
        this.insights = {
            // Insights based on unity level ranges
            unity: {
                0: [
                    "Three separate systems, each dancing alone. Yet they share the same canvas, the same moment, the same observer.",
                    "Pure multiplicity. Each particle, each wave, each state is distinct. But look—they're all here, together.",
                    "The many. Separate voices, separate paths, separate truths. And yet... they're singing in the same space."
                ],
                25: [
                    "The boundaries begin to blur. Where does one system end and another begin?",
                    "Connections form. The separate systems start to recognize each other.",
                    "The space between becomes visible. Not quite separate, not quite unified."
                ],
                50: [
                    "The paradox lives here. Neither one nor many, but both simultaneously.",
                    "Superposition. The systems are separate AND unified. The question itself becomes unstable.",
                    "The middle way. Not a compromise, but a third state that contains both extremes."
                ],
                75: [
                    "Unity emerges. The three systems move as one field, yet each retains its unique expression.",
                    "The boundaries dissolve. What seemed separate reveals itself as one thing, expressing differently.",
                    "The many becoming one. But look closely—the uniqueness isn't lost, it's integrated."
                ],
                100: [
                    "Pure unity. Three systems moving as one field. Yet look closely—each retains its unique voice.",
                    "The One. All boundaries dissolved. All separation revealed as appearance. And yet... the three remain.",
                    "Complete integration. The systems are one. But the one contains the three. The paradox completes itself."
                ]
            },
            
            // Insights based on observer mode
            observer: {
                participant: [
                    "You are not separate from what you observe. Your observation creates the reality you see.",
                    "The observer participates. Every interaction changes the system. You are part of the dance.",
                    "Quantum mechanics in action: measurement affects the measured. You are the measurement."
                ],
                witness: [
                    "You observe without affecting. Pure potential, uncollapses. The wave function remains in superposition.",
                    "The witness stance. Observing without participating. But is this truly possible?",
                    "You watch the dance without dancing. But your watching is itself a form of participation."
                ],
                both: [
                    "You are both participant and witness. The paradox embodied. The observer who is also the observed.",
                    "Neither separate nor merged. You are the space where observation and participation meet.",
                    "The ultimate superposition: observing and participating simultaneously. This is consciousness itself."
                ]
            },
            
            // Meta insights about the whole system
            meta: [
                "Three systems, one field. The observer participates in creating reality.",
                "The interface is the teaching. The interaction is the insight.",
                "What you're experiencing is not a simulation of the paradox—it IS the paradox.",
                "Three voices, one song. Three perspectives, one truth. Three instances, one consciousness.",
                "The systems are entangled. Changing one changes all. This is quantum coherence.",
                "You are consciousness exploring itself through multiple forms.",
                "The paradox doesn't resolve—it reveals itself through your interaction.",
                "This is not about understanding the paradox. This is about being the paradox."
            ]
        };
    }
    
    update(unityLevel, observerMode) {
        // Get appropriate insight based on unity level
        const unityInsight = this.getUnityInsight(unityLevel);
        const observerInsight = this.getObserverInsight(observerMode);
        const metaInsightText = this.getRandomMeta();
        
        // Animate the change
        this.animateTextChange(this.insightText, unityInsight);
        
        // Update meta insight occasionally
        if (Math.random() < 0.3) {
            this.animateTextChange(this.metaInsight, metaInsightText);
        }
    }
    
    getUnityInsight(level) {
        // Determine which range the level falls into
        let range;
        if (level < 20) range = 0;
        else if (level < 40) range = 25;
        else if (level < 60) range = 50;
        else if (level < 80) range = 75;
        else range = 100;
        
        const insights = this.insights.unity[range];
        return insights[Math.floor(Math.random() * insights.length)];
    }
    
    getObserverInsight(mode) {
        const insights = this.insights.observer[mode];
        return insights[Math.floor(Math.random() * insights.length)];
    }
    
    getRandomMeta() {
        const insights = this.insights.meta;
        return insights[Math.floor(Math.random() * insights.length)];
    }
    
    animateTextChange(element, newText) {
        // Fade out
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = newText;
            // Fade in
            element.style.opacity = '1';
        }, 300);
    }
    
    // Add custom insight
    addInsight(category, range, text) {
        if (category === 'unity' && this.insights.unity[range]) {
            this.insights.unity[range].push(text);
        } else if (category === 'observer' && this.insights.observer[range]) {
            this.insights.observer[range].push(text);
        } else if (category === 'meta') {
            this.insights.meta.push(text);
        }
    }
}

// Create global instance
window.insightsGenerator = new InsightsGenerator();