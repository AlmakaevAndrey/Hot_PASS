module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#060406',
        burgundy: '#3b0b0b',
        deepred: '#7a0f0f',
        gold: '#c9a84b',
        cream: '#f6efe6'
      },
      boxShadow: {
        glow: '0 6px 30px rgba(200,160,80,0.12)'
      }
    }
  },
  plugins: [],
}
