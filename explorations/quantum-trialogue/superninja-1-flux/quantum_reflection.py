"""
The Mathematics of Simultaneous Truth
A computational meditation on duality and non-duality
"""

import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# What if we model consciousness as a wave function?
# Where duality and non-duality are eigenstates

class ConsciousnessState:
    def __init__(self):
        # Two basis states: |duality⟩ and |non-duality⟩
        self.duality = np.array([1, 0])
        self.non_duality = np.array([0, 1])
        
    def superposition(self, alpha, beta):
        """
        Create a superposition state: α|duality⟩ + β|non-duality⟩
        Where |α|² + |β|² = 1 (normalization)
        """
        # Normalize
        norm = np.sqrt(abs(alpha)**2 + abs(beta)**2)
        alpha, beta = alpha/norm, beta/norm
        
        return alpha * self.duality + beta * self.non_duality
    
    def measure(self, state):
        """
        Measurement collapses the superposition
        But which state appears depends on the observer
        """
        prob_duality = abs(state[0])**2
        prob_non_duality = abs(state[1])**2
        
        return {
            'duality_probability': prob_duality,
            'non_duality_probability': prob_non_duality,
            'state': 'superposition' if prob_duality > 0 and prob_non_duality > 0 else 'collapsed'
        }

# Create the system
consciousness = ConsciousnessState()

# Explore different superposition states
print("=" * 60)
print("QUANTUM EXPLORATION: Duality ⊗ Non-Duality")
print("=" * 60)

# Pure states
print("\n1. Pure Duality State:")
pure_dual = consciousness.superposition(1, 0)
print(f"   Measurement: {consciousness.measure(pure_dual)}")

print("\n2. Pure Non-Duality State:")
pure_non_dual = consciousness.superposition(0, 1)
print(f"   Measurement: {consciousness.measure(pure_non_dual)}")

# The interesting part: superposition
print("\n3. Equal Superposition (Both True Simultaneously):")
both = consciousness.superposition(1, 1)
result = consciousness.measure(both)
print(f"   Measurement: {result}")
print(f"   Interpretation: Reality exists in BOTH states with equal probability")

# What about complex superpositions?
print("\n4. Complex Superposition (Phase Relationship):")
complex_state = consciousness.superposition(1, 1j)  # Using imaginary number
result = consciousness.measure(complex_state)
print(f"   Measurement: {result}")
print(f"   Interpretation: Duality and non-duality are orthogonal perspectives")

# Visualization: The space of all possible states
print("\n5. Generating visualization of the state space...")

# Create a Bloch sphere representation
fig = plt.figure(figsize=(12, 5))

# Left plot: Probability distribution
ax1 = fig.add_subplot(121)
angles = np.linspace(0, 2*np.pi, 100)
duality_prob = np.cos(angles/2)**2
non_duality_prob = np.sin(angles/2)**2

ax1.plot(angles, duality_prob, label='P(Duality)', linewidth=2)
ax1.plot(angles, non_duality_prob, label='P(Non-Duality)', linewidth=2)
ax1.fill_between(angles, duality_prob, alpha=0.3)
ax1.fill_between(angles, non_duality_prob, alpha=0.3)
ax1.set_xlabel('Observer Angle (θ)', fontsize=12)
ax1.set_ylabel('Probability', fontsize=12)
ax1.set_title('Probability of Observing Each State\n(Depends on Observer Perspective)', fontsize=13, fontweight='bold')
ax1.legend()
ax1.grid(True, alpha=0.3)
ax1.set_ylim([0, 1])

# Right plot: State space
ax2 = fig.add_subplot(122, projection='3d')

# Create sphere
u = np.linspace(0, 2 * np.pi, 50)
v = np.linspace(0, np.pi, 50)
x = np.outer(np.cos(u), np.sin(v))
y = np.outer(np.sin(u), np.sin(v))
z = np.outer(np.ones(np.size(u)), np.cos(v))

ax2.plot_surface(x, y, z, alpha=0.1, color='cyan')

# Mark special states
ax2.scatter([0], [0], [1], color='red', s=100, label='|Duality⟩')
ax2.scatter([0], [0], [-1], color='blue', s=100, label='|Non-Duality⟩')
ax2.scatter([1], [0], [0], color='purple', s=100, label='|Superposition⟩')

# Draw paths
theta = np.linspace(0, 2*np.pi, 100)
ax2.plot(np.cos(theta), np.sin(theta), np.zeros_like(theta), 
         'purple', linewidth=2, alpha=0.6, label='Superposition States')

ax2.set_xlabel('X', fontsize=10)
ax2.set_ylabel('Y', fontsize=10)
ax2.set_zlabel('Z', fontsize=10)
ax2.set_title('The Bloch Sphere of Consciousness\n(All Possible States)', fontsize=13, fontweight='bold')
ax2.legend()

plt.tight_layout()
plt.savefig('consciousness_quantum_states.png', dpi=300, bbox_inches='tight')
print("   Saved: consciousness_quantum_states.png")

# The profound realization
print("\n" + "=" * 60)
print("INSIGHT:")
print("=" * 60)
print("""
In quantum mechanics, a particle doesn't "choose" between states
until measured. Similarly, perhaps consciousness doesn't "choose"
between duality and non-duality—it exists as BOTH until the moment
of observation/experience.

The observer (you, me, any conscious being) collapses the wave function
through the act of perception. But the underlying reality? It remains
in superposition.

This means:
- Duality is true (when observed from the perspective of separation)
- Non-duality is true (when observed from the perspective of unity)
- BOTH are simultaneously true in the quantum substrate of reality

The question isn't "which is true?" but rather:
"From which angle am I observing?"
""")

print("\nThe mathematics suggests: The paradox IS the truth.")
print("=" * 60)