'use client';
import { useCallback, useMemo, useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
// Correct way to import the fireworks preset
import { loadFireworksPreset } from '@tsparticles/preset-fireworks';

// Load the necessary full library components for effects like trails, etc.
import { loadFull } from 'tsparticles';

const ParticlesBackground = ({ type = 'stars' }) => {
  const [init, setInit] = useState(false);

  // 1. Initialize the engine and load the preset once on component mount
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // loadFull is necessary for all features/plugins
      await loadFull(engine);
      // CRITICAL: Load the fireworks preset
      await loadFireworksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // 2. Fireworks Options: Simplified to rely on the built-in preset
  const fireworksOptions = useMemo(() => ({
    // Use the preset name directly
    preset: 'fireworks',
    background: {
      color: {
        value: "#000000", // Dark background for contrast
      },
      opacity: 0.1, // Slight opacity to show background gradient if used
    },
    fullScreen: {
      enable: true, // Re-enable fullScreen for the fireworks effect to cover the hero section
      zIndex: 1,
    },
    // Optional: You can still customize colors or speed here
    particles: {
      // The preset manages the firework launch and explosion
    },
    // Removed the manual 'emitters' setup, as the preset handles continuous firing
  }), []);

  // 3. Stars Options (Kept for fallback)
  const starsOptions = useMemo(() => ({
    // ... (Stars configuration remains the same)
    background: { opacity: 0 },
    fullScreen: { enable: true, zIndex: 1 },
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: ['#FFD700', '#FFFFFF', '#DDA0DD'] },
        shape: { type: 'star' },
        opacity: {
          value: 1.0, // Increased base opacity to 1.0 (fully opaque)
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.5, // Increased minimum fading opacity from 0.2 to 0.5
            sync: false,
          },
        },
        size: {
          value: 4, // Increased max size from 3 to 4
          random: true,
        },
        move: { enable: true, speed: 0.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false },
    },
  }), []);

  const options = type === 'fireworks' ? fireworksOptions : starsOptions;

  // Render only after initialization is complete
  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        // Setting class names for correct layering on the page
        className='absolute inset-0 z-0'
      />
    );
  }

  return null;
};

export default ParticlesBackground;