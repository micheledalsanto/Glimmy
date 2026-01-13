/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fredoka', 'sans-serif'],
      },
      // Glassmorphism backdrop blur
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      // 3D Transform utilities
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      // Custom shadows for glassmorphism
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 16px 48px 0 rgba(31, 38, 135, 0.45)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.42)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.3)',
        '3d': '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)',
        '3d-hover':
          '0 30px 80px rgba(0, 0, 0, 0.35), 0 15px 40px rgba(0, 0, 0, 0.25)',
      },
      // Advanced gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      // Animation keyframes
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
