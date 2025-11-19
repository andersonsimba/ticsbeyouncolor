/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
