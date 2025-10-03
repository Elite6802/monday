'use client';
import { useCallback, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFireworksPreset } from '@tsparticles/preset-fireworks';
import { loadFull } from 'tsparticles';

const ParticlesBackground = ({ type = 'stars' }) => {
  const particlesInit = useCallback(async (engine) => {
    // loadFull is necessary to load all the plugins and presets
    await loadFull(engine);
    await loadFireworksPreset(engine);
  }, []);

  const fireworksOptions = useMemo(() => ({
    preset: 'fireworks',
    background: {
      opacity: 0, // Transparent background, we use the CSS gradient
    },
    fullScreen: {
      enable: false, // Do not take up the full screen globally
      zIndex: 1, // Place above the gradient, below the text
    },
    particles: {
      move: {
        enable: false,
      },
      life: {
        count: 1,
        duration: {
          value: 0.5,
        },
      },
    },
    emitters: [
        // Continuously emit small fireworks from the bottom
        {
            direction: "top",
            life: {
                count: 0,
                duration: 0.5,
                delay: 0.5
            },
            rate: {
                delay: 0.1, // Fire every 0.1 seconds
                quantity: 1
            },
            position: {
                x: 50,
                y: 100
            },
            particles: {
                move: {
                    direction: "top",
                    enable: true,
                    outModes: {
                        top: "none",
                        default: "destroy"
                    },
                    speed: 2,
                    straight: true
                },
            }
        },
    ]
  }), []);

  const starsOptions = useMemo(() => ({
    background: {
      opacity: 0,
    },
    fullScreen: {
      enable: false,
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ['#FFD700', '#FFFFFF', '#DDA0DD'], // Gold, White, Lavender
      },
      shape: {
        type: 'star',
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.2,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
      },
    },
  }), []);

  const options = type === 'fireworks' ? fireworksOptions : starsOptions;

  return <Particles id="tsparticles" init={particlesInit} options={options} className='absolute inset-0 z-0' />;
};

export default ParticlesBackground;