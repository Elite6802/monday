'use client';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';

const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
    transition: { yoyo: Infinity, duration: 0.5 },
  },
};

export default function HeroSection({ scrollRef, ParticlesBackground, onStart }) {
  const handleClick = () => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* FIX: Ensure the component wrapper is full width and height */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ParticlesBackground type="fireworks" />
      </div>

      {/* Background Gradient - Darkened for the new theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-primary-purple/20 animate-gradient bg-[length:200%_200%] opacity-90 z-0"></div>

      <div className="relative z-10 p-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-9xl font-dancing font-bold text-secondary-gold drop-shadow-lg leading-tight" // UPDATED: Text color for dark background
        >
          Happy Birthday, My Love 🎂✨
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-4 text-xl md:text-3xl font-poppins text-white/90 drop-shadow"
        >
          3 years, countless memories, and a love that keeps growing.
        </motion.p>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={onStart}
          className="mt-12 px-10 py-4 bg-secondary-gold text-text-dark font-poppins text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Click to Begin
        </motion.button>
      </div>
    </section>
  );
}