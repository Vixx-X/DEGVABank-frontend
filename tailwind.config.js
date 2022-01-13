module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#006090',
        'primary-new': '#37A1DE',
        'secondary-new': '#26719B',
        secondary: '#004365',
        tercery: '#EF5A24',
        cuarty: '#29A9E0',
        'card-pri': {
          100: '#01ACAD',
          200: '#028385',
        },
        'card-seco': '#006090',
        'input-search': '#E4E4E4',
        quintu: '#1A1A1A',
        lightGray: '#f1f4f6',
        'primary-text': '#308bc4',
        'blue-3000': '#0F86C2',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
