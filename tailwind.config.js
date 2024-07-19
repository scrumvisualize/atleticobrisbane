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
  },
  plugins: [],
}

