/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0A0E27',
          surface: '#1A2847',
          border: '#3A5A8F',
          text: '#E0E0E0',
          accent: '#00BFFF',
          critical: '#FF4444',
        },
      },
    },
  },
  plugins: [],
}