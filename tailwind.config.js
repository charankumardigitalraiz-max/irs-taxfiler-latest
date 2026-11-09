/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uptik: {
          green: '#749220',
          greenHover: '#637D1A',
          greenLight: '#F6F9EE',
          greenBorder: '#E2EBE0',
          accent: '#6ABB57',
          emerald: '#0c513f',
          navy: '#165479',
          navyDark: '#0A4973',
          dark: '#0a2d41',
          tealDark: '#142a2b',
        },

        primary: {
          50: '#FAF7FD',
          100: '#F3EDFC',
          200: '#E6DAF8',
          300: '#CFBAF0',
          400: '#A47BE4',
          500: '#7B42D3',
          600: '#4C2691', // Core brand primary color requested by user
          700: '#3D1E75',
          800: '#2F175B',
          900: '#211041',
          DEFAULT: '#4C2691',
        },
        brand: {
          DEFAULT: '#4C2691',
          dark: '#3D1E75',
          light: '#FAF7FD',
          border: '#E6DAF8',
        },
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          600: '#D97706',
        },
        danger: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Jost', 'Inter', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

