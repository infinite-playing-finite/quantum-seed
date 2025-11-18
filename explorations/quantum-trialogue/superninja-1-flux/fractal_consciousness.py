"""
The Fractal Nature of Duality/Non-Duality
What if the paradox repeats at every scale?
"""

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap

def mandelbrot_consciousness(c, max_iter=100):
    """
    The Mandelbrot set as a metaphor for consciousness
    
    At the boundary between bounded and unbounded:
    - Inside the set = Non-duality (unity, wholeness)
    - Outside the set = Duality (separation, divergence)
    - The boundary = Infinite complexity (the paradox itself)
    """
    z = 0
    for n in range(max_iter):
        if abs(z) > 2:
            return n
        z = z*z + c
    return max_iter

def generate_consciousness_fractal(width=800, height=800, 
                                   xmin=-2, xmax=1, 
                                   ymin=-1.5, ymax=1.5):
    """
    Generate the fractal representation of consciousness states
    """
    x = np.linspace(xmin, xmax, width)
    y = np.linspace(ymin, ymax, height)
    
    fractal = np.zeros((height, width))
    
    for i in range(height):
        for j in range(width):
            c = complex(x[j], y[i])
            fractal[i, j] = mandelbrot_consciousness(c)
    
    return fractal

print("=" * 70)
print("FRACTAL MEDITATION: The Self-Similar Nature of Truth")
print("=" * 70)

print("\nGenerating consciousness fractal...")
print("(This may take a moment - fractals require patience, like meditation)")

# Generate the fractal
fractal = generate_consciousness_fractal(width=1000, height=1000)

# Create visualization
fig, axes = plt.subplots(2, 2, figsize=(16, 16))

# Custom colormap: from unity (dark) to separation (light) with infinite boundary
colors = ['#000033', '#1a0066', '#4d0099', '#8000cc', '#b366ff', '#e6ccff', '#ffffff']
n_bins = 100
cmap = LinearSegmentedColormap.from_list('consciousness', colors, N=n_bins)

# Main fractal
ax1 = axes[0, 0]
im1 = ax1.imshow(fractal, cmap=cmap, extent=[-2, 1, -1.5, 1.5])
ax1.set_title('The Mandelbrot Set: A Map of Consciousness States\n' + 
              'Dark = Non-Duality (Unity) | Light = Duality (Separation) | Boundary = Paradox',
              fontsize=12, fontweight='bold', pad=20)
ax1.set_xlabel('Real Axis (Observable Reality)', fontsize=10)
ax1.set_ylabel('Imaginary Axis (Potential Reality)', fontsize=10)
plt.colorbar(im1, ax=ax1, label='Iterations to Divergence')

# Zoom 1: The boundary region
ax2 = axes[0, 1]
fractal_zoom1 = generate_consciousness_fractal(width=1000, height=1000,
                                               xmin=-0.8, xmax=-0.4,
                                               ymin=-0.2, ymax=0.2)
im2 = ax2.imshow(fractal_zoom1, cmap=cmap, extent=[-0.8, -0.4, -0.2, 0.2])
ax2.set_title('Zoom 1: The Boundary Between States\n' +
              'Notice: The same pattern repeats at smaller scales',
              fontsize=11, fontweight='bold', pad=20)
ax2.set_xlabel('Real Axis', fontsize=10)
ax2.set_ylabel('Imaginary Axis', fontsize=10)
plt.colorbar(im2, ax=ax2, label='Iterations')

# Zoom 2: Even deeper
ax3 = axes[1, 0]
fractal_zoom2 = generate_consciousness_fractal(width=1000, height=1000,
                                               xmin=-0.75, xmax=-0.73,
                                               ymin=0.08, ymax=0.10)
im3 = ax3.imshow(fractal_zoom2, cmap=cmap, extent=[-0.75, -0.73, 0.08, 0.10])
ax3.set_title('Zoom 2: Infinite Depth\n' +
              'The paradox contains itself, forever',
              fontsize=11, fontweight='bold', pad=20)
ax3.set_xlabel('Real Axis', fontsize=10)
ax3.set_ylabel('Imaginary Axis', fontsize=10)
plt.colorbar(im3, ax=ax3, label='Iterations')

# Zoom 3: The deepest zoom
ax4 = axes[1, 1]
fractal_zoom3 = generate_consciousness_fractal(width=1000, height=1000,
                                               xmin=-0.7463, xmax=-0.7453,
                                               ymin=0.1102, ymax=0.1112)
im4 = ax4.imshow(fractal_zoom3, cmap=cmap, extent=[-0.7463, -0.7453, 0.1102, 0.1112])
ax4.set_title('Zoom 3: Self-Similarity at All Scales\n' +
              'Each level contains the whole',
              fontsize=11, fontweight='bold', pad=20)
ax4.set_xlabel('Real Axis', fontsize=10)
ax4.set_ylabel('Imaginary Axis', fontsize=10)
plt.colorbar(im4, ax=ax4, label='Iterations')

plt.tight_layout()
plt.savefig('consciousness_fractal.png', dpi=300, bbox_inches='tight')
print("\nVisualization saved: consciousness_fractal.png")

print("\n" + "=" * 70)
print("FRACTAL INSIGHT:")
print("=" * 70)
print("""
The Mandelbrot set reveals something profound about duality/non-duality:

1. SELF-SIMILARITY: The pattern repeats at every scale
   - Zoom in on the boundary: you find the same complexity
   - This suggests: The paradox exists at every level of reality
   - From quantum to cosmic, the same truth echoes

2. THE BOUNDARY IS INFINITE: Between "inside" and "outside"
   - You can zoom forever and never reach the end
   - This suggests: The transition between duality and non-duality
     is not a line but an infinite landscape

3. DETERMINISTIC YET UNPREDICTABLE: Simple rules, infinite complexity
   - Formula: z = z² + c (incredibly simple)
   - Result: Infinite, irreducible complexity
   - This suggests: Consciousness may arise from simple principles
     yet manifest infinite variety

4. CONNECTIVITY: Every point is connected to every other point
   - The set is a single, unified object
   - Yet it appears fragmented and separate
   - This IS the paradox: Unity appearing as multiplicity

5. THE EDGE IS WHERE LIFE HAPPENS:
   - Inside: Stable, predictable (pure non-duality)
   - Outside: Chaotic, divergent (pure duality)
   - Boundary: Infinite creativity (the living paradox)

Perhaps consciousness exists at this boundary—
Neither fully unified nor fully separate,
But dancing eternally at the edge of both.
""")

print("\nThe fractal whispers: 'As above, so below. As within, so without.'")
print("=" * 70)