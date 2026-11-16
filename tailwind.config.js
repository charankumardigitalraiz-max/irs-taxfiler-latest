/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GLOBAL EXACT DESIGN SYSTEM PALETTE
        primary: {
          DEFAULT: '#1F4264', // Corporate Navy
          dark: '#1E4162',
          light: '#2B5780',
          50: '#EFF4F9',
          100: '#D5E2EE',
          500: '#1F4264',
          600: '#1F4264',
          700: '#1E4162',
          800: '#16314A',
          900: '#0F2133',
        },
        teal: {
          DEFAULT: '#127EAB', // Vibrant Ocean Teal
          soft: '#37899B',    // Contact Bar Soft Slate Teal
          light: '#E9F7FA',   // Light Aqua Accent
          50: '#F0FAFC',
          100: '#E9F7FA',
          200: '#CCDCE1',
          500: '#127EAB',
          600: '#127EAB',
          700: '#0E668B',
        },
        coral: {
          DEFAULT: '#EE6450', // Warm Coral / Guarantee Accent
          muted: '#CC8B72',   // Muted Coral Terracotta
          light: '#FEF4F2',
          50: '#FEF4F2',
          100: '#FCE7E4',
          500: '#EE6450',
          600: '#D9523E',
        },
        background: {
          DEFAULT: '#FDF8F2', // Warm Ivory Global Page BG
          blue: '#EFF9FB',    // Soft Blue Curve / Ticker Tint
          aqua: '#E9F7FA',    // Light Aqua Background Accent
        },
        surface: {
          DEFAULT: '#FDFDFD', // Crisp Clean White Card Surface
          card: '#FFFFFF',
          alt: '#F8F7F3',
          blue: '#EFF9FB',
          aqua: '#E9F7FA',
        },
        border: {
          DEFAULT: '#CCDCE1', // Soft Slate Border
          light: '#E2E8F0',
        },
        text: {
          DEFAULT: '#1F4264', // Main Navy Headings & Text
          muted: '#6F7F8E',   // Slate Body Muted Text
        },
        footer: {
          DEFAULT: '#1F4264', // Navy Footer Background
          dark: '#16314A',
        },
        'action-blue': {
          DEFAULT: '#0777CB', // PayPal Button Blue
          hover: '#0562A8',
        },

        // Semantic Aliases for backwards compatibility across existing components
        secondary: {
          DEFAULT: '#127EAB',
          dark: '#0E668B',
          light: '#E9F7FA',
          soft: '#37899B',
        },
        accent: {
          DEFAULT: '#EE6450',
          hover: '#D9523E',
          muted: '#CC8B72',
          light: '#FEF4F2',
        },
        slateText: {
          DEFAULT: '#6F7F8E',
          muted: '#8A9BA8',
          dark: '#1F4264',
        },
        bar: {
          DEFAULT: '#1F4264',
          dark: '#1E4162',
        },
        paypal: {
          DEFAULT: '#0777CB',
          hover: '#0562A8',
        },

        // Legacy compatibility
        brand: {
          corporateNavy: '#1F4264',
          mutedTeal: '#127EAB',
          softTeal: '#E9F7FA',
          softIvory: '#FDF8F2',
          warmSand: '#F8F7F3',
          antiqueGold: '#EE6450',
          slateText: '#6F7F8E',
          blue: '#1F4264',
          blueHover: '#1E4162',
          indigo: '#1F4264',
          indigoLight: '#E9F7FA',
          teal: '#127EAB',
          tealHover: '#0E668B',
          tealLight: '#E9F7FA',
          tealBorder: '#CCDCE1',
          pageBg: '#FDF8F2',
          heroBg: '#FFFFFF',
          softBlue: '#EFF9FB',
          softLavender: '#FDF8F2',
          softMint: '#E9F7FA',
          heading: '#1F4264',
          body: '#6F7F8E',
          secondaryText: '#6F7F8E',
          mutedText: '#8A9BA8',
          border: '#CCDCE1',
          borderLight: '#E2E8F0',
          borderBlue: '#127EAB',
          amber: '#EE6450',
          amberLight: '#FEF4F2',
          amberText: '#CC8B72',
          green: '#127EAB',
          greenLight: '#E9F7FA',
          greenText: '#0E668B',
        },

        uptik: {
          green: '#127EAB',
          greenHover: '#0E668B',
          greenLight: '#E9F7FA',
          greenBorder: '#CCDCE1',
          accent: '#EE6450',
          emerald: '#127EAB',
          navy: '#1F4264',
          navyDark: '#1E4162',
          dark: '#1E4162',
          tealDark: '#0E668B',
        },
        success: {
          50: '#ECFDF5',
          100: '#DCFCE7',
          500: '#10B981',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
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

