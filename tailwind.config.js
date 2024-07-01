/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pest: '#299D91',
        'pest-200': '#1d756c',
        pBlack: '#191D23',
        sBlack: '#525256',
        pGray: '#666666',
        sGray: '#878787',
        phGray: '#999DA3',
        lightGray: '#D1D1D1',
        'lightGray-200': '#E8E8E8',
        'lightGray-300': '#9F9F9F',
        bGray: '#D0D5DD',
        pRed: '#E73D1C',
        'pRed-200': '#c53215',
      },
    },
  },
  plugins: [],
};
