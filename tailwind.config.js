/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'x-sm': '400px'
      },

      backgroundColor: {
        primary: "#333333"
      },

      animation: {
        'popup': 'fade-in 1s linear forwards'
      },

      keyframes: {
        'fade-in': {
          'from': {
            transform: 'translateY(-10px)',
            opacity: 0
          },
          
          '25%': {
            transform: 'translateY(5px)',
          },
          
          '50%': {
            opacity: 1,
            transform: 'translateY(-2px)',
          },

          'to': {
            opacity: 1,
            transform: 'translateY(0)',
          }
        }
      }
    },
  },
  plugins: [],
}

