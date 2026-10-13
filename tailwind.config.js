/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe4ea',
          200: '#fecdd8',
          300: '#fda4b8',
          400: '#fb7190',
          500: '#f43f6a',
          600: '#e11d48',
        },
        mint: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        softpink: '#FADADD',
        softmint: '#B8E0D2',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.3)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
