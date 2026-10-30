/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5EF',
        ink: '#172321',
        teal: {
          DEFAULT: '#00A7A5',
          deep: '#007B78',
          soft: '#E3F4F3',
        },
        rose: '#E82E73',
        gold: '#F5D840',
        price: '#F22D32',
        sand: '#EFE7DA',
        line: '#E6DED1',
        muted: '#7C8A85',
        amber: '#F5B33C',
      },
      fontFamily: {
        sans: ['Cairo', 'system-ui', 'sans-serif'],
        logo: ['Cairo', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        card: '0 8px 24px -16px rgba(23, 35, 33, 0.28)',
        float: '0 18px 40px -24px rgba(23, 35, 33, 0.45)',
      },
      borderRadius: {
        xl2: '1.375rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s ease-out both',
        'scale-in': 'scale-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
