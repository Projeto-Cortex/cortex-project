// tailwind.config.js
// Tokens de design do Limoeiro Casa de Festas
// Entregar ao Inácio (Layout) na semana 1

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta principal
        limoeiro: {
          green: '#3dab84',
          'green-dark': '#2d8f6c',
          'green-light': '#e8f7f2',
          'green-xlight': '#f4fbf8',
          warm: '#f9f5f0',
          brown: '#7a6b5a',
          'brown-light': '#a08f7c',
          peach: '#f7e8dc',
          gold: '#d4a940',
          forest: '#1a3d2e',
        },
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      // Google Fonts já importadas via index.html ou main.jsx:
      // https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700
      //   &family=Lato:wght@300;400;700
      //   &family=Dancing+Script:wght@700
      //   &display=swap
    },
  },
  plugins: [],
};
