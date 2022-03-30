module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          'sans': [ '"Helvetica Neue"',
            'Arial',
            '"Hiragino Kaku Gothic ProN"',
            '"Hiragino Sans"',
            'Meiryo',
            'sans-serif'],
        },
    },
  },
  plugins: [],
}
