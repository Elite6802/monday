/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ... (colors)
      animation: {
        'gradient': 'gradient 8s linear infinite',
        // Increased time to 90s for a slow, less distracting scroll
        'scroll-x': 'scroll-x 2s linear infinite',
        'scroll-x-reverse': 'scroll-x-reverse 2s linear infinite', // New reverse animation
      },
      keyframes: {
        gradient: {
          // ... (keyframe content)
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0%)' }, // Start fully to the left
          '100%': { transform: 'translateX(-50%)' }, // Scroll exactly half its duplicated width
        },
        'scroll-x-reverse': { // New reverse keyframes
          '0%': { transform: 'translateX(-50%)' }, // Start at the midpoint
          '100%': { transform: 'translateX(0%)' }, // End fully to the left
        },
      },
    },
  },
  plugins: [],
}