/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        display: ['"Baloo 2"', 'sans-serif'],
      },
      colors: {
        // Carta e sfondi
        cream: '#FBF8F2',
        paper: '#FFFFFF',
        // Testo
        ink: {
          DEFAULT: '#2B2D42',
          soft: '#6E7191',
          faint: '#A0A3BD',
        },
        // Accenti — Glimmy è una stella dorata
        sun: {
          50: '#FFF8E6',
          100: '#FFEFC2',
          200: '#FFE08A',
          300: '#FFCE4F',
          400: '#F7B32B',
          500: '#E59D13',
          600: '#C4830A',
        },
        sky2: {
          50: '#EEF6FC',
          100: '#D8EBF8',
          300: '#8CC4EC',
          400: '#4E9DE0',
          500: '#3784C7',
          600: '#2A6BA5',
        },
        mint: {
          50: '#EAF8F2',
          100: '#CFF0E1',
          300: '#7DDBB4',
          400: '#3FBF8F',
          500: '#2EA478',
          600: '#23855F',
        },
        coral: {
          50: '#FDEFED',
          100: '#FBDAD6',
          300: '#F5A69E',
          400: '#F0766B',
          500: '#DE584C',
          600: '#C03E33',
        },
      },
      boxShadow: {
        // Ombre morbide stratificate per il look "carta premium"
        card: '0 1px 2px rgba(43, 45, 66, 0.04), 0 8px 24px -8px rgba(43, 45, 66, 0.12)',
        'card-hover': '0 2px 4px rgba(43, 45, 66, 0.05), 0 16px 40px -12px rgba(43, 45, 66, 0.18)',
        button: '0 2px 0 rgba(43, 45, 66, 0.08), 0 8px 20px -8px rgba(43, 45, 66, 0.25)',
        ring: '0 0 0 4px rgba(247, 179, 43, 0.25)',
      },
      borderRadius: {
        card: '1.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.3)' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'pop-in': 'pop-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'rise-in': 'rise-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        wiggle: 'wiggle 0.8s ease-in-out',
        twinkle: 'twinkle 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
