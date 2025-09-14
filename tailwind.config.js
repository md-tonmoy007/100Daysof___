/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twitter: {
          background: '#15202b',
          backgroundSecondary: '#192734',
          surface: '#22303c',
          border: '#38444d',
          primary: '#1da1f2',
          error: '#f4212e',
          success: '#17bf63',
          text: '#d9d9d9',
          textSecondary: '#8899a6',
        },
      },
    },
  },
  plugins: [],
}