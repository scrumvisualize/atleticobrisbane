/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundPosition: {
        'custom-center': 'center 5px', // Adjust the 10px value as needed
      },
    },
    keyframes: {
      pulse: {
        '0%, 100%': { transform: 'scale(1.25)' },
        '50%': { transform: 'scale(1.1)' },
      },
    },
    animation: {
      pulse: 'pulse 2s infinite',
    },
  },
  plugins: [],
}

