export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        slateConcrete: '#63676c',
        ash: '#c8c4bd',
        charcoal: '#171717',
        sienna: '#a65f36',
        brass: '#b08a54',
        concrete: '#d5ccbd',
        ink: '#111214'
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glass: '0 24px 80px rgba(17, 18, 20, 0.18)',
        lift: '0 20px 55px rgba(17, 18, 20, 0.22)'
      }
    }
  },
  plugins: []
};
