/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#FF69B4',
        'secondary-gold': '#FFD700',
        'primary-purple': '#8A2BE2',
      },
      fontFamily: {
        // Ensure these match the imports in your global CSS
        dancing: ['"Dancing Script"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      // === CRITICAL: ADD THIS textShadow BLOCK ===
      textShadow: {
        'glow-pink': '0 0 8px #FF69B4, 0 0 20px #FF69B4, 0 0 30px #FF69B4',
        'glow-gold': '0 0 8px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700',
      },
    },
  },
  plugins: [
    // === CRITICAL: ADD THIS PLUGIN FUNCTION ===
    function ({ addUtilities, theme }) {
      const newUtilities = {
        // Define the two classes used in the ImageGallery.js
        '.text-glow-pink': {
            textShadow: theme('textShadow.glow-pink'),
        },
        '.text-glow-gold': {
            textShadow: theme('textShadow.glow-gold'),
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};